import Detail from "../View/Home/post/Detail.vue";
import AboutView from "../View/Home/about/aboutme.vue";
const home = [
  {
    path: "/home",
    component: () => import("../../src/View/Home/Index.vue"), // Component cha
    // meta: { requiresRole: "Admin" },
    children: [
      {
        path: "listblogs",
        name: "list_blogs",
        component: () => import("../../src/View/Home/Home.vue"),
      },
      {
        path: "detail/:id",
        name: "Detail",
        component: Detail,
        props: true,
      },
      {
        path: "/aboutme",
        name: "AboutView",
        component: AboutView,
      },
    ],
  },
];

export default home;
