<template>
  <div class="not-found-container">
    <el-row :gutter="20" class="content-row" justify="center" align="middle">
      <el-col :xs="24" :sm="12" class="text-content">
        <div class="error-code">404</div>
        <div class="error-message">Oops! 页面不见啦</div>
        <div class="error-description">
          您访问的页面可能已经丢失在数字宇宙中<br>
          或者暂时不可用
        </div>
        <el-button 
          type="primary" 
          :icon="House" 
          @click="goHome"
          class="home-button"
        >
          返回首页
        </el-button>
      </el-col>
      <el-col :xs="24" :sm="12" class="illustration">
        <div class="astronaut-container">
          <svg class="astronaut" viewBox="0 0 200 200">
            <!-- 宇航员头盔 -->
            <circle cx="100" cy="70" r="40" fill="#f0f2f5" />
            <!-- 身体 -->
            <rect x="70" y="100" width="60" height="80" rx="10" fill="#409eff" />
            <!-- 背包 -->
            <rect x="130" y="110" width="20" height="60" rx="5" fill="#f0f2f5" />
            <!-- 左手臂 -->
            <rect x="40" y="110" width="20" height="40" rx="5" fill="#409eff" />
            <!-- 右手臂 -->
            <rect x="140" y="110" width="20" height="40" rx="5" fill="#409eff" />
          </svg>
          <div class="planet"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { House } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped lang="less">
.not-found-container {
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  padding: 20px;

  .content-row {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .text-content {
    text-align: center;
    padding: 20px;

    .error-code {
      font-size: 8rem;
      font-weight: bold;
      color: #409eff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .error-message {
      font-size: 2rem;
      color: #303133;
      margin-bottom: 15px;
      font-weight: 500;
    }

    .error-description {
      font-size: 1.1rem;
      color: #606266;
      line-height: 1.6;
      margin-bottom: 30px;
    }

    .home-button {
      padding: 12px 30px;
      font-size: 1.1rem;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(64, 158, 255, 0.3);
      }
    }
  }

  .illustration {
    padding: 20px;
    position: relative;

    .astronaut-container {
      position: relative;
      max-width: 400px;
      margin: 0 auto;

      .astronaut {
        width: 100%;
        height: auto;
        animation: float 3s ease-in-out infinite;
      }

      .planet {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 120px;
        background: #e6a23c;
        border-radius: 50%;
        box-shadow: inset -10px -10px 20px rgba(0, 0, 0, 0.1);
        &::after {
          content: '';
          position: absolute;
          top: 20%;
          left: 30%;
          width: 30px;
          height: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }
      }
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@media (max-width: 768px) {
  .text-content {
    order: 2;
  }
  
  .illustration {
    order: 1;
    margin-bottom: 40px;
  }

  .error-code {
    font-size: 6rem !important;
  }
}
</style>