import { useUserStore } from "@/store/auth"

//使用方法 v-permission="['admin']"
export default {
  beforeMount(el:any,binding:any) {
    const userStore = useUserStore()
    const {roles} = userStore
    const requirePermisson = binding.value
    if(!roles.includes(requirePermisson)) {
      el.style.display = 'none'
    }
  } 
}