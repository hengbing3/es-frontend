/*
 * @Author: Christer hongweibing3@gmail.com
 * @Date: 2023-10-08 15:46:29
 * @LastEditors: Christer hongweibing3@gmail.com
 * @LastEditTime: 2023-10-10 22:57:45
 * @FilePath: \es-frontend\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexPage from "../views/IndexPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: IndexPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
