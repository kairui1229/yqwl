<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card>
                <MapContain />
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card class="des">
                <h1 style="text-align: center;margin-bottom: 10px;">详情面板</h1>
                <div>1.累计充电站数量：<el-text type="primary">34个</el-text></div>
                <div>2.单省份最多充电桩：<el-text type="primary">北京(4个)</el-text></div>
                <div>3.充电站遍及省份：<el-text type="primary">14个</el-text></div>
                <div>4.暂无充电站省份：<el-text type="primary">2个</el-text></div>
                <div>5.累计充电站：<el-text type="primary">北京(4个)</el-text></div>
                <div>6.单日营收最高：<el-text type="primary">郑州二七广场充电站</el-text></div>
                <div>7.单日营收最低：<el-text type="primary">南宁青秀山充电站</el-text></div>
                <div>8.故障率最高：<el-text type="primary">兰州黄河桥充电站</el-text></div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h3>新增站点地图</h3>
                    </div>
                </template>
                <el-form :model="form" :rules="rules" ref="formRef" style="max-width: 600px;" label-width="85px">
                    <el-form-item label="站点名称:" prop="name">
                        <el-input placeholder="请输入站点名称" v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="站点地址:" prop="region">
                        <el-input placeholder="请输入站点地址" v-model="form.region" />
                    </el-form-item>
                    <el-form-item label="经度：" prop="location1">
                        <el-input placeholder="请输入经度" v-model="form.location1" />
                    </el-form-item>
                    <el-form-item label="维度：" prop="location2">
                        <el-input placeholder="请输入维度" v-model="form.location2" />
                    </el-form-item>
                    <el-form-item label="立即使用：">
                        <el-switch v-model="form.now" />
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input placeholder="请输入备注" type="textarea" v-model="form.remarks" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">创建</el-button>
                        <el-button @click="resetForm">清空</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import MapContain from '@/components/map/MapContain.vue'
import { reactive, ref } from "vue"
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'

const form = reactive({
    name: "",
    region: "",
    location1: "",
    location2: "",
    now: false,
    remarks: ""
})

const resetForm = () => {
    form.name = ""
    form.region = ""
    form.location1 = ""
    form.location2 = ""
    form.now = false
    form.remarks = ""
}

const rules = reactive<FormRules>({
    name: [
        { required: true, message: "站点名称不能为空", trigger: "blur" }
    ],
    region: [
        { required: true, message: "站点地址不能为空", trigger: "blur" }
    ],
    location1: [
        { required: true, message: "站点经度不能为空", trigger: "blur" }
    ],
    location2: [
        { required: true, message: "站点纬度不能为空", trigger: "blur" }
    ]
})

const formRef = ref<FormInstance | null>(null)

const submitForm = async () => {
    if (!formRef.value) return
    
    await formRef.value.validate((valid: boolean) => {
        if (valid) {
            // 假设这里是提交表单的逻辑
            ElNotification({
                title: '创建成功',
                message: '创建站点成功',
                type: 'success'
            })
            
            setTimeout(() => {
                location.reload()
            }, 1000)
        } else {
            ElNotification({
                title: '创建失败',
                message: '请检查表单信息是否填写完整',
                type: 'error'
            })
        }
    })
}
</script>