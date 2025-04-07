<template>
  <div class="logo">
    <img :src="logo" width="34px" height="34px">
    <h1>源启未来</h1>
  </div>
  <el-menu :router="true" :default-active="$route.path">
    <menu-item v-for="item in menuitems" :key="item.url" :item="item"></menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/auth';
import MenuItem from './MenuItem.vue';
import logo from "@/assets/logo1.png"

const userStore = useUserStore();
const menuitems = userStore.menu;
</script>

<style lang="less" scoped>
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 5px 0;
  img{
    margin-left: -10px;
  }
  h1{
    color:#2F4F4F;
    margin-left: 10px;
    font-size: 22px;
  }
}
.el-menu{
  border-right: none;
}
</style>