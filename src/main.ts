import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
import "@/router/guard"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import './mock'
import permisson from './directives/permisson'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(createPinia())
app.directive('permission', permisson)
app.mount('#app')
