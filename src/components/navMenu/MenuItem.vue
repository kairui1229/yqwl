<template>
  <el-sub-menu v-if="item.children" :index="item.url">
    <template #title>
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.name }}</span>
    </template>
    <!-- 自己调用自己 -->
    <MenuItem v-for="child in item.children" :key="child.url" :item="child"></MenuItem>
  </el-sub-menu>
  <el-menu-item v-else :index="item.url" @click="add(item.name,item.url,item.icon)" v-show="!(item.name ==='订单详情')">
    <template #title>
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.name }}</span>
    </template>
  </el-menu-item>
</template>


<script setup lang="ts">
import { useTabsStore } from '@/store/tabs';
import type { MenuItem as MenuItemType } from '@/types/user/index';

defineProps<{ item: MenuItemType }>();

const { addTab, setCurrentTab } = useTabsStore();
const add = (name: string, url: string, icon: string) => {
  addTab(name, url, icon);
  setCurrentTab(name, url);
};
</script>

<style lang="less" scoped>
.is-active {
  color: #fff;
  background-color: rgb(34,136,255)!important;
  div{
    span{
      color: #fff;
    }
  }
}
.el-menu-item:hover {
  color: #fff;
  background-color: rgb(34,136,255)!important;
}
:deep .el-sub-menu__title:hover{
  color: #fff;
  background-color: rgb(34,136,255)!important;
}
</style>