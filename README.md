# 源启未来能源管理系统
### 在线访问地址：http://117.72.63.66
### 登录账号：admin    登录密码：admin666
### 项目描述
前端个人项目，基于 Vue3 + TypeScript 搭建的充电能源管理平台，通过Mock模拟后端数据，构建能源领域多维度监控平台，实现充电站运行实时追踪、设备能效强弱分析及全国充电网络地理可视化。
### 主要技术栈：
Vue3 + TypeScript + Vite + Echarts + Mock + Less + 高德地图api + TinyMCE富文本编辑器
### 项目内容
1.根据角色动态分配权限，实现了页面级的权限控制和按钮级的权限控制

2.使用echarts并封装了自定义组合式函数useCharts进行不同图表数据可视化渲染

3.自主封装页签快捷导航组件，结合pinia存储和菜单路由联动

4.根据业务需求特点自主封装useTable和usePagination进行页面快捷发

5.递归动态渲染菜单导航，并保持与页签、路由的联动

6.封装千分位分隔插件处理数字展示

7.axios的二次封装，拦截器的封装，api接口的统一封装

8.下拉表单结合递归树形控件实现模糊查询

9.使用高德地图api渲染地图并实现地图打点标记和信息窗体功能

10.KeepAlive配合路由元信息和路由监听实现定向缓存功能优化性能

11.表格数据一键导出到本地excel文件功能

12.树形控件联动动态表单的数据收集和动态校验功能

13.基于element plus组件进行二次封装，结合业务场景封装分步表单组件

14.使用富文本编辑器TinyMCE发布招商文章

15.将TinyMCE富文本内容一键导出到本地html文件功能

16.动态角色权限分配，并结合递归闭包处理权限菜单

17.封装自定义指令实现按钮级权限控制

18.项目环境变量配置、打包、部署上线、nginx配置
