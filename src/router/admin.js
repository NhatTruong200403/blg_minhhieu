const admin = [
    {
      path: "/",
      component: () => import("../../src/View/Home/Index.vue"), // Component cha
      // meta: { requiresRole: "Admin" },
      children: [
        {
          path: "Home",
          name: "home_blog",
          component: () => import("../../src/View/Home/Home.vue"),
        }
      ],
    },
  ];
  
  export default admin;
  