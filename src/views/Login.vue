<!-- prefix-icon 自定义前缀图标 全局注册不用再加冒号了 -->
<template>
  <div class="bg">
    <div class="scanlines"></div>
    <div class="particles"></div>
    <div class="login">
      <div class="logo">
        <img :src="logo" alt="" width="70px" height="70px">
        <h1 class="ml">源启未来充电系统</h1>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" prefix-icon="Lock" />
        </el-form-item>
        <el-form-item class="mt">
          <el-button 
            type="primary" 
            style="width: 100%;" 
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/logo1.png'
import { reactive, ref} from 'vue';
import type { FormRules, FormInstance } from 'element-plus'
import { useUserStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { ElLoading } from 'element-plus'; // 引入 ElLoading

interface RuleForm {
  username: string,
  password: string
}

const ruleForm: RuleForm = reactive({
  username: '',
  password: ''
})

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 4, max: 8, message: '用户名长度应在 4 到 8 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ]
})

const formRef = ref<FormInstance>()
const userStore = useUserStore()
const router = useRouter()

// 定义 loading 状态
let loadingInstance: any = null

const handleLogin = () => {
  // 显示全屏 loading
  loadingInstance = ElLoading.service({
    fullscreen: true,
    text: '正在登录...',
    background: 'rgba(0, 0, 0, 0.7)'
  });

  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      await userStore.login(ruleForm); // 用异步是因为要在登录成功后跳转页面
      router.push('/');  // 页面跳转
      loadingInstance.close(); // 跳转后关闭 loading
    } else {
      console.log('登录失败');
      loadingInstance.close(); // 失败时关闭 loading
    }
  });
};

</script>



<style lang="less" scoped>
.bg {
  background-image: url(../assets/bg1.jpg);
  background-size: cover;
  background-position: center center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  animation: 
    bgBreath 20s ease-in-out infinite alternate;

  // 双层流光
  &::before, &::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.05) 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.05) 75%
    );
    animation: gradientFlow 15s linear infinite;
    z-index: 0;
  }

  &::after {
    animation-duration: 20s;
    background: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.03) 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.03) 75%
    );
  }

  // 动态扫描线
  .scanlines {
    position: absolute;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15) 0px,
      rgba(0, 0, 0, 0.15) 1px,
      transparent 2px,
      transparent 5px
    );
    animation: scanMove 4s linear infinite;
  }

  // 光点粒子
  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(255,255,255,0.2) 1px, transparent 1px),
      radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 1px, transparent 1px);
    background-size: 4% 4%;
    animation: particleMove 20s linear infinite;
  }

  .login {
     // 磨砂玻璃效果
     background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    
    // 原有定位样式
    position: relative;
    z-index: 1;
    width: 500px;
    height: 250px;
    padding: 50px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    text-align: center;
    position: absolute;
    top: 35%;
    margin-top: -100px;
    left: 48%;
    margin-left: -250px;


    .logo {
      // 原有样式保持不变
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
      h1 { color:#2F4F4F;margin: 0 0 0 10px; }
    }
  }
}

@keyframes bgBreath {
  0% { background-size: 100% 100%; }
  100% { background-size: 110% 110%; }
}

@keyframes gradientFlow {
  0% { transform: rotate(0deg) translate(-50%, -50%); }
  100% { transform: rotate(360deg) translate(-50%, -50%); }
}

@keyframes particleMove {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 100% 100%, -100% -100%; }
}

@keyframes scanMove {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0%); }
}
</style>