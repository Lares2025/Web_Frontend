import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/VueLogin.vue";
import Signin from "../pages/VueSignin.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
