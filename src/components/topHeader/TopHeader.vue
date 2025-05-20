<template>
  <div class="header">
     <div class="personal">
        <el-badge :is-dot="info>0" class="item">
          <el-icon style="cursor: pointer"><Bell></Bell></el-icon>
        </el-badge>
        <el-avatar
        src="https://i.pinimg.com/736x/11/a7/7f/11a77f39d6d412f82c23cb8eda91ed5d.jpg"
        class="ml mr"
        />
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        欢迎你，{{ username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="User" command="user" @click="addPersonalTab">个人中心</el-dropdown-item>
            <el-dropdown-item icon="Document" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
  </el-dropdown>
     </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import { useUserStore } from '@/store/auth';
import { useTabsStore } from '@/store/tabs';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const info = ref(5)
const {username} = storeToRefs(useUserStore())
const router = useRouter()
const tabsStore = useTabsStore() 

// 新增：添加个人中心标签方法
const addPersonalTab = () => {
  tabsStore.addTab(
    '个人中心',      // 标签名称
    '/personal',     // 路由路径
    'User'           // 使用Element Plus的用户图标
  )
  tabsStore.setCurrentTab('个人中心', '/personal')
}

const handleCommand = (command:string)=>{
  if(command === 'user'){
    addPersonalTab() 
    router.push('/personal')
  }else{
    useUserStore().logout()
    router.push('/login')
  }
}
</script>

<style lang='less' scoped>
.header{
  background-color: #fff;
  height: 60px;
  padding:0 20px;
  .personal{
    display: flex;
    float: right;
    height: 60px;
    align-items: center;
    .item{
      margin-top: 10px;
    }
  }
}
</style>