<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model.trim="searchParams.name" placeholder="请输入姓名">
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-select placeholder="请选择部门" v-model="searchParams.department">
          <el-option label="总裁办" value="总裁办"></el-option>
          <el-option label="技术部" value="技术部"></el-option>
          <el-option label="市场部" value="市场部"></el-option>
          <el-option label="维修部" value="维修部"></el-option>
          <el-option label="运营部" value="运营部"></el-option>
          <el-option label="客服部" value="客服部"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column type="index" label="序号" align="center" header-align="center" width="80" />
      <el-table-column prop="account" label="账号" align="center" header-align="center" width="110"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" header-align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" align="center" header-align="center"></el-table-column>
      <el-table-column prop="idNo" label="身份证号" align="center" header-align="center" width="200"></el-table-column>
      <el-table-column prop="position" label="职位" align="center" header-align="center">
        <template #default="scope">
          <el-tag type="success">{{ scope.row.position }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门" align="center" header-align="center"></el-table-column>
      <el-table-column prop="pageAuthority" label="页面权限" align="center" header-align="center">
        <template #default="scope">
          <el-tag type="danger">{{ scope.row.pageAuthority }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="btnAuthority" label="按钮权限" align="center" header-align="center">
        <template #default="scope">
          <el-tag type="warning">{{ scope.row.btnAuthority }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" header-align="center" width="300">
        <template #default="scope">
          <el-button type="primary" size="small"
            @click="settingAuth(scope.row.account,scope.row.pageAuthority,scope.row.btnAuthority)">
            权限设置
          </el-button>
          <el-popconfirm title="确定要删除该用户吗？" confirm-button-text="确认" cancel-button-text="取消"
            @confirm="handleDelete(scope.row.account)">
            <template #reference>
              <el-button type="danger" size="small">
                <el-icon> <Delete /> </el-icon> 删除
              </el-button>
            </template>
          </el-popconfirm>
          <el-switch style="margin-left: 10px;" :model-value="scope.row.status" active-text="禁用" inactive-text=""
          @change="handleDisable(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="fr mt mb" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next, jumper,total" :total="totals"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" background />
  </el-card>

  <auth-modal :visible="visible" :checked-keys="checkedKeys" @close="visible = false" :btnAuth="btnAuth"
    :account="accountNo" @reload="loadData">
  </auth-modal>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useHttp } from "@/hooks/useHttp";
import AuthModal from "./AuthModal.vue";
import { getAuthApi } from "@/api/system"
import type { MenuItem } from "@/types/user";
import { ElMessage } from "element-plus";
import { nextTick } from "vue"

interface searchType {
  name: string,
  department: string
}

const searchParams = ref<searchType>({
  name: '',
  department: ''
})

const { dataList,
  loading,
  resetPagination,
  loadData,
  totals,
  pageInfo,
  handleCurrentChange,
  handleSizeChange }
  = useHttp("/permissionList", searchParams)

//创建函数获取所有的子节点url
function collectUrls(tree: MenuItem[]) {
  const urls: string[] = []
  //判断单条数据，如果数据没有children，则添加到urls数组中，如果有children，则递归调用
  function traverse(node: MenuItem) {
    if (node.url && !node.children) {
      urls.push(node.url)
    }
    if (node.children) {
      node.children.forEach((child: MenuItem) => traverse(child))
    }
  }
  //遍历接口调过来的数组
  tree.forEach((node: MenuItem) => traverse(node))
  return urls
}

const checkedKeys = ref<string[]>([]) //已选中的节点存到checkedKeys数组
const accountNo = ref<string>("")
const btnAuth = ref<string[]>([]) //已选中的按钮存到btnAuth数组
const visible = ref(false)

const settingAuth = async (account: string, pageAuthority: string, btnAuthority: string) => {
  accountNo.value = account //将当前行的账号传递给子组件,以便后面接口调用时候知道是哪个账号
  const { data: { list, btn } } = await getAuthApi(pageAuthority, btnAuthority)
  checkedKeys.value = collectUrls(list) //勾选的列表权限节点并且要传递给子组件
  btnAuth.value = btn //勾选的按钮权限节点并且要传递给子组件
  visible.value = true
}

const handleReset = () => {
  searchParams.value = {
    name: "",
    department: ""
  }
  resetPagination()
}

const handleDelete = (account: any) => {
  ElMessage({
    message: `账号 ${account} 删除成功`,
    type: "success"
  })
  handleReset()
}

const handleDisable = (row: any) => {
  row.status = !row.status
  nextTick(() => {
    ElMessage({
      message: `${row.name}的账号${row.status ? "禁用" : "启用"}成功`,
      type: "success"
    })
  })
}
</script>