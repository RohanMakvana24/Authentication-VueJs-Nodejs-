import { createWebHistory, createRouter } from "vue-router";
import LoginCom from "./LoginCom";
import RagisterCom from "./RagisterCom";
import DashboardCom from "./DashBoardCom.vue";
const routes = [
  {
    name: "Login",
    path: "/",
    component: LoginCom,
  },
  {
    name: "Ragister",
    path: "/ragister",
    component: RagisterCom,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: DashboardCom,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
