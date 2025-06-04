<template>
  <el-card>
    <el-radio-group v-model="radio" size="large" class="mt" @change="handleClick">
      <el-radio-button label="全部" :value="0"></el-radio-button>
      <el-radio-button label="严重告警" :value="1"></el-radio-button>
      <el-radio-button label="紧急告警" :value="2"></el-radio-button>
      <el-radio-button label="一般告警" :value="3"></el-radio-button>
    </el-radio-group>
  </el-card>
  <el-card class="mt" v-for="item in alarmList" :key="item.equNo">
    <el-alert :title="`${item.address}充电桩充电异常`" type="warning" show-icon/>
    <el-descriptions border :column="4" direction="vertical" class="mt">
      <el-descriptions-item v-for="(val, key) in item" :label="getLabel(key)">
        <el-tag v-if="key == 'level'" :type="val == 1 ? 'danger' : (val == 2 ? 'warning' : 'info')">
          {{ val == 1 ? '严重' : (val == 2 ? '紧急' : '一般') }}
        </el-tag>
        <el-text type="danger" v-else-if="key == 'status'">
          {{ val == 1 ? "待指派" : (val == 2 ? "处理中" : "处理异常") }}
        </el-text>
        <span v-else>{{ val }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="操作">
        <el-button @click="openDrawer(item.address)" :type="item.status == 2 ? 'danger' : 'primary'">
          {{ item.status == 1 ? "指派" : (item.status == 2 ? "催办" : "查看") }}
        </el-button>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <el-drawer v-model="drawer">
    <template #title>
    <span style="color: black;">{{selectedItem}}充电站报警任务处理</span>
  </template>
    <StepForm :steps="steps" :form1="form1" :form2="form2" :form3="form3" @handle-submit="handleSubmit">
      <template #step-1>
        <el-form :model="formData.basicInfo" :rules="basicRules" ref="form1">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="formData.basicInfo.name" />
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="formData.basicInfo.email" />
          </el-form-item>
          <el-form-item label="电话：" prop="tel">
            <el-input v-model="formData.basicInfo.tel" />
          </el-form-item>
          <el-form-item label="工号：" prop="no">
            <el-input v-model="formData.basicInfo.no" />
          </el-form-item>
          <el-form-item label="是否加急：">
            <el-switch v-model="formData.basicInfo.urgent"></el-switch>
          </el-form-item>
          <el-form-item label="其他选项：">
            <el-checkbox-group v-model="formData.basicInfo.other">
              <el-checkbox value="1">更换设备</el-checkbox>
              <el-checkbox value="2">仅维修</el-checkbox>
              <el-checkbox value="3">需拍照片</el-checkbox>
              <el-checkbox value="4">需报备</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="其他备注信息：">
            <el-input v-model="formData.basicInfo.remarks" type="textarea" />
          </el-form-item>
        </el-form>
      </template>
      <template #step-2>
        <el-form :model="formData.shenpi" ref="form2" :rules="shenpiRules">
          <el-form-item label="审批部门" prop="a">
            <el-select placeholder="请选择审批部门" v-model="formData.shenpi.a">
              <el-option label="总裁办" value="1"></el-option>
              <el-option label="运营部" value="2"></el-option>
              <el-option label="维修部" value="3"></el-option>
              <el-option label="市场部" value="4"></el-option>
              <el-option label="财务部" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="抄送部门" prop="b">
            <el-select placeholder="请选择抄送部门" v-model="formData.shenpi.b">
              <el-option label="总裁办" value="1"></el-option>
              <el-option label="运营部" value="2"></el-option>
              <el-option label="维修部" value="3"></el-option>
              <el-option label="市场部" value="4"></el-option>
              <el-option label="财务部" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template #step-3>
        <el-form :model="formData.info" :rules="infoRules" ref="form3">
          <el-form-item label="负责人姓名：" prop="person">
            <el-input v-model="formData.info.person" />
          </el-form-item>
          <el-form-item label="负责人电话：" prop="tel">
            <el-input v-model="formData.info.tel" />
          </el-form-item>
        </el-form>
      </template>
    </StepForm>
    <el-result :title="`设备编号：${randomDeviceId}`" :sub-title="`该任务已催促${randomUrgency}次，请抓紧处理`">
      <template #icon>
         <el-icon><randomIcon /></el-icon> 
      </template>
      <template #extra>
        <el-button type="primary" @click="closeDrawer">我已知晓</el-button>
      </template>
    </el-result>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { alarmListApi } from "@/api/alarm"
import { onMounted } from "vue";
import { getLabel } from "./fieldLabelMap"
import StepForm from "@/components/stepForm/StepForm.vue"
import type { FormInstance } from "element-plus";
import { ElMessage } from 'element-plus'

interface AlarmListType {
  description: string,
  address: string,
  equNo: string,
  level: number,//1严重 2紧急 3一般
  time: string,
  code: number,//故障代码
  status: number,//1待指派 2处理中 处理异常
}

const radio = ref(0) // 默认选中“全部”
const alarmList = ref<AlarmListType[]>([])
const alarmListCopy = ref<AlarmListType[]>([])

onMounted(async () => {
  const { data } = await alarmListApi()
  alarmListCopy.value = data
  alarmList.value = data // 初始化时显示所有告警
})

const handleClick = () => {
  const selectedLevel = radio.value; // 获取当前选中的告警级别
  if (selectedLevel === 0) { 
    // 如果选中的是“全部”，则显示所有告警
    alarmList.value = alarmListCopy.value;
  } else {
    // 否则根据选中的告警级别进行过滤
    alarmList.value = alarmListCopy.value.filter(item => item.level === selectedLevel);
  }
}

const drawer = ref(false)
const selectedItem = ref(null); // 选中项
const openDrawer = (address: any) => {
  selectedItem.value = address;
  drawer.value = true;
};
const closeDrawer = () => {
  selectedItem.value = null;
  drawer.value = false;
}

const steps = [
  { title: '基本信息' },
  { title: '审批信息' },
  { title: '负责人信息' },
]

const formData = ref({
  basicInfo: {
    name: "",
    email: "",
    tel: "",
    no: "",
    urgent: false,
    other: [],
    remarks: ""
  },
  shenpi: {
    a: "",
    b: ""
  },
  info: {
    person: "",
    tel: ""
  }
})

const basicRules = {
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" }
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" }
  ],
  tel: [
    { required: true, message: "请输入电话", trigger: "blur" }
  ],
  no: [
    { required: true, message: "请输入工号", trigger: "blur" }
  ]
}
const shenpiRules = {
  a: [
    { required: true, message: "不能为空", trigger: "blur" }
  ],
  b: [
    { required: true, message: "不能为空", trigger: "blur" }
  ],
}

const infoRules = {
  person: [
    { required: true, message: "不能为空", trigger: "blur" }
  ],
  tel: [
    { required: true, message: "不能为空", trigger: "blur" }
  ],
}

const form1 = ref<FormInstance>()
const form2 = ref<FormInstance>()
const form3 = ref<FormInstance>()

const handleSubmit = async() => {
  ElMessage({
    message: '操作成功',
    type: 'success',
  });
  drawer.value = false;
  // 重新获取 alarmList 数据
  const { data } = await alarmListApi();
  alarmList.value = data;

  formData.value = {
  basicInfo: {
    name: "",
    email: "",
    tel: "",
    no: "",
    urgent: false,
    other: [],
    remarks: ""
  },
  shenpi: {
    a: "",
    b: ""
  },
  info: {
    person: "",
    tel: ""
  }
 }
}

// 生成随机设备编号
const randomDeviceId = `CD${Math.floor(Math.random() * 9000) + 1000}`;

// 生成随机催促次数
const randomUrgency = Math.floor(Math.random() * 5) + 1; // 1 到 5 次随机

// 可能的图标
const icons = [ "warning", "error", "info"];
const randomIcon = icons[Math.floor(Math.random() * icons.length)];
</script>