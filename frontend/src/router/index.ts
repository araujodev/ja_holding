import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProjectsCreateView from "../views/ProjectsCreateView.vue";
import ProjectsUpdateView from "../views/ProjectsUpdateView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/projects/create",
    name: "create-project",
    component: ProjectsCreateView,
  },
  {
    path: "/projects/update",
    name: "update-project",
    component: ProjectsUpdateView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
