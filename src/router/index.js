import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import CreateTemplate from "../views/createTemplate.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    path: "/form",
    name: "Form",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/form.vue")
  },
  {
    path: "/createTemplate",
    name: "CreateTemplate",
    component: CreateTemplate
  }
];

const router = new VueRouter({
  routes
});

export default router;
