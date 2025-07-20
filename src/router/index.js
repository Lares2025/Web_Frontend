import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Signin from "../pages/VueSignin.vue";
import Dashboard from "../pages/main/Dashboard.vue";
import Send from "../pages/main/DataSend.vue";
import Control from "../pages/main/ControlData.vue";
import Deliver from "../pages/main/DeliverData.vue";
import Etc from "../pages/main/EtcData.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/Signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/Send",
    name: "Send",
    component: Send,
  },
  {
    path: "/Control",
    name: "Control",
    component: Control,
  },
  {
    path: "/Deliver",
    name: "Deliver",
    component: Deliver,
  },
  {
    path: "/Etc",
    name: "Etc",
    component: Etc,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
