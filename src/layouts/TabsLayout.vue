<template>
  <el-tabs 
          v-model="currentTab.name" 
          type="card" 
          class="demo-tabs" 
          @tab-click="handleClick"
          closable
          @tab-remove="remove"
          >
            <el-tab-pane 
            v-for="item in tabs"
            :key="item.name"
            :label="item.name"
            :name="item.name"
            >
              <template #label>
                <span class="custom-tabs-label">
                  <el-icon>
                    <component :is="item.icon"></component>
                  </el-icon>
                  <span>&nbsp;{{ item.name }}</span>
                </span>
              </template>
            </el-tab-pane>
          </el-tabs>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>
            </keep-alive>
             <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
          </router-view>
</template>

<script setup lang="ts">
import { useTabsStore} from '@/store/tabs';
import { useUserStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute} from 'vue-router';

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()
const {menu} = storeToRefs(userStore)

const tabsStore = useTabsStore()
const {addTab,setCurrentTab, removeTab} = tabsStore
const {tabs,currentTab} = storeToRefs(tabsStore)

function findObjectByUrl(arr:any[],url:string){
  for(const item of arr){
    if(item.url === url){
      return item
  }
  if(item.children){
    const found:any = findObjectByUrl(item.children,url)
    if(found){
      return found
    }
  }
    }
    return null
 }
const {name,url,icon} = findObjectByUrl(menu.value,route.path)
addTab(name,url,icon)
setCurrentTab(name,url)

const handleClick = ({index}:{index:number}) => {
  router.push(tabs.value[index].url)//跳转
  setCurrentTab(tabs.value[index].name, tabs.value[index].url)//设置当前高亮
}
const remove = (TabPaneName:string) => {
  removeTab(TabPaneName)
  router.push(currentTab.value.url)
  //！！！手动触发一次点击当前高亮事件，不手动触发的话会出现问题！！！
  setCurrentTab(currentTab.value.name,currentTab.value.url)
}


</script>
<style lang="less" scoped>
.demo-tabs {
  :deep .is-active{
    background-color: rgb(34,136,255)!important;
    color: white!important;
  }
}
</style>