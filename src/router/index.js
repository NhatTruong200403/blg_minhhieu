import { createRouter, createWebHistory } from 'vue-router';
import admin from './admin.js';
import HomeView from '../View/Home/Home.vue';
import AboutView from '../View/Home/about/aboutme.vue';
import Detail from '../View/Home/post/Detail.vue';

// Định nghĩa các route chính
const routes = [
    // ...admin,
    {
        path: '/',
        redirect: '/Home', // Chuyển hướng về /Home
    },
    {
        path: '/Home',
        name: 'HomeView',
        component: HomeView, // Thêm route cho Home
    },
    {
        path: '/aboutme',
        name: 'AboutView',
        component: AboutView,
    },
    {
        // path: '/detail/:id',
        path: '/detail',
        name: 'Detail',
        component: Detail,
    },
];

// Tạo router
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // Nếu đã lưu vị trí cuộn (khi dùng nút quay lại/tiến tới)
        if (savedPosition) {
            return savedPosition;
        }
        // Mặc định cuộn về đầu trang
        return { top: 0 };
    },
});

// Hàm lấy role của người dùng từ sessionStorage
// Hàm lấy danh sách role của user từ sessionStorage
// function getUserRoles() {
//     const user = JSON.parse(sessionStorage.getItem('User'));
//     return user?.roles || ['guest']; // Nếu không có, trả về danh sách với 'guest' mặc định
// }

// Hàm kiểm tra quyền truy cập
router.beforeEach((to, from, next) => {
    // const requiredRoles = to.meta.requiresRole; // Có thể là mảng hoặc chuỗi
    // const userRoles = getUserRoles(); // Lấy danh sách role của người dùng từ sessionStorage

    // console.log('Required Roles:', requiredRoles);
    // console.log('User Roles:', userRoles);

    // // Nếu `requiredRoles` là mảng, kiểm tra ít nhất một role của user có nằm trong requiredRoles
    // if (requiredRoles && Array.isArray(requiredRoles)) {
    //     const hasAccess = userRoles.some(role => requiredRoles.includes(role));
    //     if (!hasAccess) {
    //         return next({ name: 'unauthorized' }); // Chuyển hướng đến trang không có quyền truy cập
    //     }
    // } else if (requiredRoles && !userRoles.includes(requiredRoles)) {
    //     // Nếu `requiredRoles` là chuỗi, kiểm tra xem userRoles có chứa requiredRole hay không
    //     return next({ name: 'unauthorized' }); // Chuyển hướng đến trang không có quyền truy cập
    // }

    next(); // Cho phép truy cập nếu mọi điều kiện đều đúng
});

export default router;