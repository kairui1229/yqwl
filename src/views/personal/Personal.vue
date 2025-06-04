<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <el-descriptions direction="vertical" border style="margin-top: 20px">
          <el-descriptions-item :rowspan="2" :width="140" label="个人头像" align="center">
            <el-image style="width: 100px; height: 120px"
              :src="touxiang" />
          </el-descriptions-item>
          <el-descriptions-item label="姓名">欧阳凯锐</el-descriptions-item>
          <el-descriptions-item label="电话">18838913429</el-descriptions-item>
          <el-descriptions-item label="地址">河南省郑州市</el-descriptions-item>
          <el-descriptions-item label="个人标签">
            <el-tag type="primary" class="mr">爱国</el-tag>
            <el-tag type="success" class="mr">敬业</el-tag>
            <el-tag type="info" class="mr">诚信</el-tag>
            <el-tag type="warning" class="mr">友善</el-tag>
          </el-descriptions-item>

        </el-descriptions>
      </el-card>
      <el-card class="mt">
        <el-calendar v-model="value" />
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <span>完善个人资料</span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col :span="16">
            <StepForm :steps="steps" :form1="form1" :form2="form2" @handle-submit="handleSubmit">
              <template #step-1>
                <el-form :model="formData.basicInfo" ref="form1">
                  <el-form-item label="姓名">
                    <el-input v-model="formData.basicInfo.name" />
                  </el-form-item>
                  <el-form-item label="电话">
                    <el-input v-model="formData.basicInfo.tel" />
                  </el-form-item>
                  <el-form-item label="地址">
                    <el-input v-model="formData.basicInfo.address" />
                  </el-form-item>
                </el-form>
              </template>
              <template #step-2>
                <el-form :model="formData.job" ref="form2">
                  <el-select placeholder="请选择在职状态" v-model="formData.job.status">
                    <el-option label="工作中" value="1"> </el-option>
                    <el-option label="请假中" value="2"> </el-option>
                    <el-option label="出差中" value="3"> </el-option>
                    <el-option label="年假中" value="4"> </el-option>
                  </el-select>
                </el-form>
              </template>
            </StepForm>
          </el-col>
          <el-col :span="8">
            <div style="display: flex;align-items: center;flex-direction: column;justify-content: space-around;">
              <h1 style="margin-bottom: 40px;" class="mt">资料完善度</h1>
              <el-progress type="circle" :percentage="88" />
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <el-badge :value="18" class="mr">
          <el-button>待办事项</el-button>
        </el-badge>
        <el-badge :value="5" class="mr">
          <el-button>指派给我</el-button>
        </el-badge>
        <el-badge :value="12" class="mr">
          <el-button>部门公告</el-button>
        </el-badge>
        <el-badge :value="6" class="mr">
          <el-button>站内信</el-button>
        </el-badge>
        <el-badge :value="2" class="mr" type="primary">
          <el-button>我指派的</el-button>
        </el-badge>
      </el-card>
      <el-card class="mt">
          <el-collapse>
            <el-collapse-item title="账号注销通知！" name="1">
              <div style="display: flex;justify-content: space-between;" class="mt">
                <h3>员工离职，账号需要注销，请及时处理！</h3>
                <el-button type="primary" size="small" class="mr" v-permission="'admin'" @click="handleRoute">去处理</el-button>
              </div>
            </el-collapse-item>
            <el-collapse-item title="权限变更通知！" name="2">
              <div style="display: flex;justify-content: space-between;">
                <h3>卡尔因部门调动账号权限需调整！</h3>
                <el-button type="primary" size="small" class="mr" v-permission="'user'" @click="handleRoute">去处理</el-button>
              </div>

            </el-collapse-item>
            <el-collapse-item title="财务放款通知！" name="3">
              <div style="display: flex;justify-content: space-between;">
                <h3>郑州充电站充电桩维修放款！</h3>
                <el-button type="primary" size="small" class="mr" @click="handleRoute">去处理</el-button>
              </div>

            </el-collapse-item>
            <el-collapse-item title="人员调动通知！" name="4">
              <div style="display: flex;justify-content: space-between;">
                <h3>麦克由行政部转为维修部，需要办理！</h3>
                <el-button type="primary" size="small" class="mr" @click="handleRoute">去处理</el-button>
              </div>

            </el-collapse-item>
            <el-collapse-item title="出差费用报销审批" name="5">
              <div style="display: flex;justify-content: space-between;">
                <h3>运营部9人出差，报销费用8700元需审批</h3>
                <el-button type="primary" size="small" class="mr" @click="handleRoute">去处理</el-button>
              </div>

            </el-collapse-item>
            <el-collapse-item title="财务放款通知！" name="6">
              <div style="display: flex;justify-content: space-between;">
                <h3>北京充电站充电桩维修放款！</h3>
                <el-button type="primary" size="small" class="mr" @click="handleRoute">去处理</el-button>
              </div>

            </el-collapse-item>
            <el-collapse-item title="人员调动通知！" name="7">
              <div style="display: flex;justify-content: space-between;">
                <h3>李继维由行政部转为维修部，需要办理！</h3>
                <el-button type="primary" size="small" class="mr" @click="handleRoute">去处理</el-button>
              </div>

            </el-collapse-item>
            <el-collapse-item title="出差费用报销审批" name="8">
              <div style="display: flex;justify-content: space-between;">
                <h3>运营部9人出差，报销费用8700元需审批</h3>
                <el-button type="primary" size="small" class="mr" @click="handleRoute">去处理</el-button>
              </div>

            </el-collapse-item>
            <el-collapse-item title="账号注销通知！" name="9">
              <div style="display: flex;justify-content: space-between;">
                <h3>员工离职，账号需要注销，请及时处理</h3>
                <el-button type="primary" size="small" class="mr" @click="handleRoute">去处理</el-button>
              </div>

            </el-collapse-item>
            <el-collapse-item title="权限变更通知！" name="10">
              <div style="display: flex;justify-content: space-between;">
                <h3>王丽丽因部门调动账号权限需调整！</h3>
                <el-button type="primary" size="small" class="mr" @click="handleRoute">去处理</el-button>
              </div>

            </el-collapse-item>
            <el-collapse-item title="财务放款通知！" name="11">
              <div style="display: flex;justify-content: space-between;">
                <h3>北京充电站充电桩维修放款！</h3>
                <el-button type="primary" size="small" class="mr" @click="handleRoute">去处理</el-button>
              </div>

            </el-collapse-item>
          </el-collapse>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import StepForm from '@/components/stepForm/StepForm.vue';
import { ElMessage, type FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';
import {useTabsStore} from '@/store/tabs'
import touxiang from '@/assets/touxiang.webp'

const value = ref(new Date())
const steps = [
  { title: '基本信息' },
  { title: '在职信息' }
]
const form1 = ref<FormInstance>()
const form2 = ref<FormInstance>()
const formData = ref({
  basicInfo: {
    name: '',
    tel: '',
    address: ''
  },
  job: {
    status: ''
  }
})

const handleSubmit = () => {
  ElMessage({
    message: '个人资料更新成功',
    type: 'success'
  })
}

const router = useRouter()
const {addTab,setCurrentTab} = useTabsStore()
const handleRoute = () => {
  addTab('系统设置','/system','Setting',)
  setCurrentTab('系统设置','/system')
  router.push('/system')
}
</script>