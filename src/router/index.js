import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import SpotLight from "../pages/SpotLight.vue";
import Doll from "../pages/WindUpDoll.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/spotlight",
    name: "spotlight",
    component: SpotLight,
  },
  {
    path: "/doll",
    name: "doll",
    component: Doll,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
