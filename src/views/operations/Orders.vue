<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入订单号" v-model="searchParams.orderNo"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select placeholder="订单状态" v-model="searchParams.status">
          <el-option label="全部" :value="1"></el-option>
          <el-option label="进行中" :value="2"></el-option>
          <el-option label="已完成" :value="3"></el-option>
          <el-option label="异常" :value="4"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="设备编号" v-model="searchParams.no"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
      <el-col :span="6" class="mt">
        <el-input placeholder="请输入站点名称" v-model="searchParams.name"></el-input>
      </el-col>
      <el-col :span="6" class="mt">
        <el-date-picker v-model="dateRange" type="daterange" range-separator="/" start-placeholder="开始日期"
          end-placeholder="结束日期" @change="handleChange" value-format="YYYY-MM-DD" />
      </el-col>
      <el-col :span="6" class="mt jianju">
        <el-text type="primary" style="font-size: 16px">今日日期：{{ today }}</el-text>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-button type="danger" :disabled="!selectionList.length" @click="handleBatchDelete">
      批量删除
    </el-button>
    <el-button type="primary" icon="Download" :disabled="!selectionList.length" @click="exportToExcel">
      导出订单数据到Excel
    </el-button>
  </el-card>
  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column label="订单号" prop="orderNo"></el-table-column>
      <el-table-column label="设备编号" prop="equipmentNo"></el-table-column>
      <el-table-column label="订单日期" prop="date"></el-table-column>
      <el-table-column label="开始时间" prop="startTime"></el-table-column>
      <el-table-column label="结束时间" prop="endTime"></el-table-column>
      <el-table-column label="金额(元)" prop="money"></el-table-column>
      <el-table-column label="支付方式" prop="pay">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.pay == '微信'">{{ scope.row.pay }}</el-tag>
          <el-tag type="danger" v-else-if="scope.row.pay == '花呗'">{{ scope.row.pay }}</el-tag>
          <el-tag type="primary" v-else-if="scope.row.pay == '支付宝'">{{ scope.row.pay }}</el-tag>
          <el-tag type="warning" v-else-if="scope.row.pay == '银行卡'">{{ scope.row.pay }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" prop="status">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status == 2">进行中</el-tag>
          <el-tag type="primary" v-else-if="scope.row.status == 3">已完成</el-tag>
          <el-tag type="danger" v-else-if="scope.row.status == 4">异常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleDetail(scope.row.orderNo)">详情</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="fr mt mb" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next, jumper,total" :total="totals"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" background />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useHttp } from "@/hooks/useHttp";
import { batchDeleteApi } from "@/api/operation";
import { ElMessage } from "element-plus"
import { useRouter, useRoute } from "vue-router";
import { useTabsStore } from "@/store/tabs"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"

interface SearchType {
  orderNo: string,
  status: number,
  no: string,
  name: string,
  startData: string,
  endData: string
}

interface SelectionListType {
  orderNo: string,
  equipmentNo: string,
  date: string,
  startTime: string,
  endTime: string,
  money: string,
  pay: string,
  status: number
}

const today = ref(new Date().toISOString().split("T")[0]); // 获取当前日期

const searchParams = ref<SearchType>({
  orderNo: "",
  status: 1,
  no: "",
  name: "",
  startData: "",
  endData: "",
})

const dateRange = ref<string[]>([]); // 日期范围
const handleChange = () => {
  if (dateRange.value && dateRange.value.length === 2) {
    searchParams.value.startData = dateRange.value[0];
    searchParams.value.endData = dateRange.value[1];
  } else {
    searchParams.value.startData = "";
    searchParams.value.endData = "";
  }
};

const {
  dataList,
  loading,
  totals,
  pageInfo,
  loadData,
  handleSizeChange,
  handleCurrentChange,
  resetPagination
} = useHttp<SelectionListType>("/orderList", searchParams);

const handleSearch = () => {
  loadData();
}

const handleReset = () => {
  dateRange.value = [];
  searchParams.value = {
    orderNo: "",
    status: 1,
    no: "",
    name: "",
    startData: "",
    endData: "",
  }
  resetPagination();
}

const selectionList = ref<SelectionListType[]>([]);
const handleSelectionChange = (val: SelectionListType[]) => {
  selectionList.value = val;
}

const handleBatchDelete = async () => {
  const res = await batchDeleteApi(selectionList.value.map(item => item.orderNo));
  if (res.code === 200) {
    ElMessage({
      message: res.data,
      type: "success"
    });
    loadData();
  }
}

const router = useRouter();
const tabsStore = useTabsStore();
const { addTab, setCurrentTab } = tabsStore;
const handleDetail = (orderNo: string) => {
  tabsStore.setOrderNo(orderNo); // 存储订单号
  addTab("订单详情", "/operations/detail", "Share");
  setCurrentTab("订单详情", "/operations/detail");
  router.push("/operations/detail"); // 这里不带参数，防止丢失
};

//如果是订单详情页面返回订单管理页面，则不重新加载
const route = useRoute();
watch(() => route.name, (to, from) => {
  // console.log(to,from);
  if (to == "orders" && from != "detail") {
    loadData()
    handleReset();
  }
})

const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(selectionList.value);//把数据转成工作表格式
  const wb = XLSX.utils.book_new();//创建新的工作簿
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");//工作簿加到工作表中
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, "导入的数据.xlsx")
}
</script>

<style lang="less" scoped>
.jianju {
  margin: 27px 25px;
}
</style>