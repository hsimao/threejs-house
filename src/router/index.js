import { createRouter, createWebHistory } from "vue-router";
import Cube from "../views/cube.vue";

const routes = [
  {
    path: "/",
    name: "Cube",
    component: Cube,
  },
  {
    path: "/sphere",
    name: "Aphere",
    component: () =>
      import(/* webpackChunkName: "sphere" */ "../views/sphere.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
