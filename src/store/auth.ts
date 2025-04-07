import { defineStore } from "pinia";
import { ref} from "vue";
import { loginApi } from "@/api/user";

interface LoginParams {
  username: string;
  password: string;
}

export const useUserStore = defineStore("user", () => {
  // 状态，避免刷新时丢失
  const token = ref(sessionStorage.getItem("token") || "");
  const username = ref(sessionStorage.getItem("username") || "");
  const roles = ref(sessionStorage.getItem("roles") ? JSON.parse(sessionStorage.getItem("roles")!) : []);
  const menu = ref(sessionStorage.getItem("menu") ? JSON.parse(sessionStorage.getItem("menu")!) : []);

  // 登录方法
  const login = async (data: LoginParams) => {
    try {
      const { data: { token: newToken, user: { username: newUsername, roles: newRoles }, menulist } } 
      = await loginApi(data);
      token.value = newToken;
      username.value = newUsername;
      roles.value = newRoles;
      menu.value = menulist;

      sessionStorage.setItem("token", newToken);
      sessionStorage.setItem("username", newUsername);
      sessionStorage.setItem("roles", JSON.stringify(newRoles));
      sessionStorage.setItem("menu", JSON.stringify(menulist));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // 退出登录方法
  const logout = () => {
    sessionStorage.clear();
    token.value = "";
    username.value = "";
    roles.value = [];
    menu.value = [];
  };

  return { token, username, roles, menu, login, logout };
});

// import { defineStore } from "pinia";
// import { loginApi } from "@/api/user";

// interface LoginParams{
//   username:string,
//   password:string
// }


// export const useUserStore = defineStore("user", {
//   state: () => ({
//     token: sessionStorage.getItem("token") || "",
//     roles: sessionStorage.getItem("roles")?JSON.parse(sessionStorage.getItem("roles")!):[],
//     username: sessionStorage.getItem("username") || "",
//     menu: sessionStorage.getItem("menu")?JSON.parse(sessionStorage.getItem("menu")!):[]
//   }),
//   actions: {
//    async login(data:LoginParams){
//       try {
//         const {data:{token, user:{username,roles},menulist}} =  await loginApi(data)
//         this.token = token
//         this.username = username
//         this.roles = roles
//         this.menu = menulist
//         sessionStorage.setItem("token",token)
//         sessionStorage.setItem("username",username)
//         sessionStorage.setItem("roles",JSON.stringify(roles))
//         sessionStorage.setItem("menu",JSON.stringify(menulist))
//     } catch (error) {
//     console.log("error",error);
//    }
//   },
//   logout(){
//         sessionStorage.clear()
//         this.token = ""
//         this.username = ""
//         this.roles = []
//         this.menu = []
//   }
//  },
// })
