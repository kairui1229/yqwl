import router from "./index";
import { useUserStore} from "@/store/auth";

router.beforeEach(to => {
  const userStore = useUserStore();
  const isLogin = userStore.token;
  if(!isLogin){
    if(to.path !== '/login'){
      return {path: '/login'}
    }
  }else{
    if(to.path === '/login'){
      return {path: '/'}
   }
   if(to.meta?.needAuth && !userStore.roles.some((role:String) => (to.meta.needAuth as String[]).includes(role))){
     return {path: '/'}
   }
  }
})


// 1.前端默认不创建完整路由，后端会给我们返回一个路由表，前端根据这个路由表来创建路由
// 2.前端创建完整路由表，后端返回一个权限表，
// 路由表文件中设置路由的meta属性，meta属性中设置roles属性，roles属性中设置权限，根据权限来动态创建路由