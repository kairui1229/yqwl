import { createApp } from 'vue'
import './style.less'
// import '@/styles/element/index.scss' //覆盖element-plus主题颜色
import App from './App.vue'
//引入路由
import router from './router'
//引入路由导航守卫
import "@/router/guard"
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' //需要覆盖主题颜色的话这一行就要删掉
//引入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入pinia
import { createPinia } from 'pinia'
//引入mock
import './mock'
//引入自定义指令
import permisson from './directives/permisson'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(ElementPlus)
app.use(createPinia())
app.directive('permission', permisson)
app.mount('#app')

