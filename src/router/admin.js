// import CreatePost from "../";
import CreatePost from "../View/Home/admin/Post/BlogForm.vue";
// import CreatePost from "../View/Home/admin/CreatePost.vue";
import CreateType from "../View/Home/admin/TypePost/TypeForm.vue";
import ListBlogs from "../View/Home/admin/Post/ListBlogs.vue";
import ListTypies from "../View/Home/admin/TypePost/ListTypies.vue";
import UpdateBlog from "../View/Home/admin/Post/UploadBlog.vue";
const admin = [
    {
      path: "/admin",
      component: () => import("../View/Home/AdminView.vue"), // Component cha
      // meta: { requiresRole: "Admin" },
      meta: { requiresAuth: true },
      children: [
        {
          path: "createBlog",
          name: "CreateBlog",
          component: CreatePost,
        },
        {
          path: "updateBlog/:id",
          name: "UpdateBlog",
          component: UpdateBlog,
          props: { isEditMode: false }
        },
        {
          path: "createType",
          name: "CreateType",
          component: () => CreateType,
        },
        {
          path: "updateType/:id",
          name: "UpdateType",
          component: () => CreateType,
          props: { isEditMode: false }
        },
        {
          path: "listBlogs",
          name: "ListBlogs",
          component: ListBlogs,
        },
        {
          path: "listTypies",
          name: "ListTypies",
          component: () => ListTypies,
        },
        { // Thêm route này
          path: "", // Hoặc path: "dashboard"
          name: "admin-dashboard",
          component: CreateType,
        },
      ],
    },
  ];
  
  export default admin;
  