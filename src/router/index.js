import { createRouter, createWebHistory } from 'vue-router';
import admin from './admin.js';
import HomeView from '../View/Home/Home.vue';
import index from './home.js'
import AboutView from '../View/Home/about/aboutme.vue';
import Detail from '../View/Home/post/Detail.vue';
import home from './home.js';
import Login from '../View/Home/Login.vue';
// Định nghĩa các route chính
const routes = [
    ...index,
    ...admin,
    ...home,

    {
        path: '/',
        redirect: '/Home/ListBlogs', // Chuyển hướng về /Home
    },
    {
        path: '/Home/ListBlogs',
        name: 'HomeView',
        component: HomeView, // Thêm route cho Home
    },
    // ,
    {
        path: '/Login',
        name: 'Login',
        component: Login,
    },
    
];
// Tạo router
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // Nên thêm BASE_URL
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { top: 0 };
    },
});

const isAuthenticated = () => {
    return !!localStorage.getItem('authToken'); // Chú ý: Đây chỉ là ví dụ!
};

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
    const loggedIn = isAuthenticated();
    if (requiresAuth && !loggedIn) {
        // Nếu route yêu cầu đăng nhập mà người dùng chưa đăng nhập
        console.log('Chưa đăng nhập, chuyển hướng tới /Login');
        // Lưu lại đường dẫn người dùng muốn vào để chuyển hướng lại sau khi đăng nhập (tùy chọn)
        next({ name: 'Login', query: { redirect: to.fullPath } });
    } else if (requiresGuest && loggedIn) {
        // Nếu route yêu cầu là khách (vd: trang Login) mà người dùng đã đăng nhập
        console.log('Đã đăng nhập, chuyển hướng khỏi /Login');
        next('/Home/ListBlogs'); // Chuyển về trang chủ hoặc dashboard
    } else {
        // Nếu không thuộc các trường hợp trên (route công khai, hoặc route cần login mà đã login)
        next(); // Cho phép đi tiếp
    }
});

export default router;