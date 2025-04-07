import { defineStore } from "pinia";
import { ref } from "vue";
import type { MenuItem } from "@/types/user";

export const useTabsStore = defineStore("tabs", () => {
  const tabs = ref<MenuItem[]>([]);
  const currentTab = ref<{ name: string; url: string }>({ name: "", url: "" });
  
  // 1️⃣ 新增 `orderNo` 变量
  const orderNo = ref<string>("");

  const addTab = (name: string, url: string, icon: string) => {
    if (!tabs.value.some((tab) => tab.url === url)) {
      tabs.value.push({ name, url, icon });
    }
  };

  const setCurrentTab = (name: string, url: string) => {
    currentTab.value = { name, url };
  };

  const removeTab = (name: string) => {
    // 如果删除的是高亮的
    if (currentTab.value.name === name) {
      const currentIndex = tabs.value.findIndex((tab) => tab.name === name);
      if (currentIndex !== 0) {
        currentTab.value = tabs.value[currentIndex - 1];
      } else {
        return;
      }
    }
    tabs.value = tabs.value.filter((tab) => tab.name !== name);
  };

  // 2️⃣ 添加方法：设置 `orderNo`
  const setOrderNo = (no: string) => {
    orderNo.value = no;
  };

  return {
    tabs,
    addTab,
    currentTab,
    setCurrentTab,
    removeTab,
    orderNo, // 3️⃣ 让外部可以访问 `orderNo`
    setOrderNo,
  };
});
