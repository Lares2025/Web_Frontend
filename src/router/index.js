import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/VueLogin.vue";
import Signin from "../pages/VueSignin.vue";
import Send from "../pages/main/DataSend.vue";

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
    path: "/Send",
    name: "Send",
    component: Send,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
