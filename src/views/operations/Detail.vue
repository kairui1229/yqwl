<template>
  <el-card v-if="orderNo">
    <el-descriptions title="详情展示" type="vertical" :column="3" border>
      <el-descriptions-item label="订单编号">{{ orderNo }}</el-descriptions-item>
      <el-descriptions-item label="设备编号">{{ orderData.equipmentNo }}</el-descriptions-item>
      <el-descriptions-item label="订单日期">{{ orderData.date }}</el-descriptions-item>
      <el-descriptions-item label="站点名称">
        <el-tag size="large">{{ orderData.siteName }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="开始时间">{{ orderData.startTime }}</el-descriptions-item>
      <el-descriptions-item label="结束时间">{{ orderData.endTime }}</el-descriptions-item>
      <el-descriptions-item label="订单金额(元)">{{ orderData.money }}</el-descriptions-item>
      <el-descriptions-item label="支付方式">{{ orderData.pay }}</el-descriptions-item>
      <el-descriptions-item label="所属城市">{{ orderData.city }}</el-descriptions-item>
      <el-descriptions-item label="充电量(度)">{{ orderData.chargeVolume }}</el-descriptions-item>
      <el-descriptions-item label="充电设备">{{ orderData.equipmentType }}</el-descriptions-item>
      <el-descriptions-item label="充电总时长(小时)">{{ orderData.chargeTime }}</el-descriptions-item>
      <el-descriptions-item label="负责人姓名">欧阳凯锐</el-descriptions-item>
      <el-descriptions-item label="负责人电话">1838913429</el-descriptions-item>
      <el-descriptions-item label="维保人员姓名">{{ orderData.maintainerName }}</el-descriptions-item>
      <el-descriptions-item label="维保人员电话">{{ orderData.maintainerPhone }}</el-descriptions-item>
      <el-descriptions-item label="订单状态">{{ orderData.status }}</el-descriptions-item>
      <el-descriptions-item label="服务费(元)">{{ orderData.serviceFee }}</el-descriptions-item>
      <el-descriptions-item label="停车费(元)">{{ orderData.parkingFee }}</el-descriptions-item>
      <el-descriptions-item label="电费(元)">{{ orderData.electricityFee }}</el-descriptions-item>
      <el-descriptions-item label="收费信息">{{ orderData.feeInfo }}</el-descriptions-item>
      <el-descriptions-item label="备注" :span="3">{{ orderData.remark }}</el-descriptions-item>
    </el-descriptions>
  </el-card>

  <el-card v-else class="expired-card">
    <el-empty description="当前订单详情已过期,请返回订单管理页面重新选择" />
    <div class="button-container">
      <el-button type="primary" @click="goBack">返回订单管理</el-button>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useTabsStore } from "@/store/tabs";
import { computed,ref } from "vue";
import Mock from "mockjs";

const route = useRoute();
const tabsStore = useTabsStore();

// 优先使用 `query`，如果没有就用 Pinia 存的
const orderNo = computed(() => route.query.orderNo || tabsStore.orderNo);

const router = useRouter();
const goBack = () => {
  tabsStore.addTab("订单管理", "/operations/orders", "DocumentCopy");
  tabsStore.setCurrentTab("订单管理", "/operations/orders");
  tabsStore.removeTab("订单详情");
  router.push("/operations/orders");
}

// 生成相同的城市名称
const cityName = Mock.Random.city();

const orderData = ref(Mock.mock({
  equipmentNo: "C@natural(1000,9999)",
  date: "@date('2025-MM-dd')",
  siteName: cityName + " 充电站", // 站点名称的城市名与 city 保持一致
  startTime: "@time('HH:mm:ss')",
  endTime: "@time('HH:mm:ss')",
  money: "@float(10, 100, 1, 2)",
  pay: "@pick(['微信', '支付宝', '银行卡', '花呗'])",
  city: cityName,
  chargeVolume: "@integer(10, 100)",
  equipmentType: Mock.Random.pick(["充电桩(快充)", "充电桩(慢充)", "充电桩(交流)"]),
  chargeTime: "@integer(1, 5)",
  maintainerName: "@cname",
  maintainerPhone: "1@natural(3000000000, 3999999999)",
  status: "@pick(['进行中', '已完成', '异常'])",
  serviceFee: "@float(5, 20, 1, 2)",
  parkingFee: "@float(2, 10, 1, 2)",
  electricityFee: "@float(20, 80, 1, 2)",
  feeInfo: "电费+服务费+停车费，高峰时段费用为2.3元1度，停车费2元/小时，服务费5元/次",
  remark: "暂无",
}));
</script>

<style lang="less" scoped>
.button-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-top: -30px;
}
</style>