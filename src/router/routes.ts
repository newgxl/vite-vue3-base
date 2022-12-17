// 导入类型注解
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import("@/views/main/Main.vue"),
    // redirect: '/user',
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import("@/views/main/user/user.vue"),
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/not-found/NotFound.vue")
  }

]

export default routes
