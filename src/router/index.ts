import { createRouter, createWebHistory } from "vue-router";
import { start, close } from "@/plugins/nprogress";
//导入页面的路由
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

let asynRoute = {
  path: 'about',
  name: 'about',
  component: () => import("@/views/main/about/about.vue"),
}
let flag = true
// 前置路由
router.beforeEach((to, from, next) => {
  start()
  if (flag) {
    router.addRoute('main', asynRoute)
    flag = false
    next({ ...to, replace: true })
  } else {
    next()
  }
  console.log('router', router.getRoutes())
})
// 后置守卫
router.afterEach(() => {
  close()
})

export default router;
