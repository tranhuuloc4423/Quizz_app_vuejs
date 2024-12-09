import { createRouter, createWebHistory } from "vue-router";
import LoginComponent from "../components/LoginComponent.vue";
import RegisterComponent from "../components/RegisterComponent.vue";
import HomeComponent from "../components/HomeComponent.vue";
import QuizBuilderComponent from "../components/QuizBuilderComponent.vue";
import ManageQuizComponent from "../components/ManageQuizComponent.vue";
import TakeQuizComponent from "../components/TakeQuizComponent.vue";

const routes = [
    {
        path: "/",
        name: "HomeComponent",
        component: HomeComponent,
        // meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "LoginComponent",
        component: LoginComponent,
    },
    {
        path: "/register",
        name: "RegisterComponent",
        component: RegisterComponent,
    },
    {
        path: "/create-quiz",
        name: "QuizBuilderComponent",
        component: QuizBuilderComponent,
    },
    {
        path: "/manage-quiz",
        name: "ManageQuizComponent",
        component: ManageQuizComponent,
    },
    {
        path: "/take-quiz/:id",
        name: "TakeQuizComponent",
        component: TakeQuizComponent,
        props: true,
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Middleware kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("QuizAuth"); // Hoặc kiểm tra token từ store

    if (to.meta.requiresAuth && !isAuthenticated) {
        // Nếu cần đăng nhập mà chưa đăng nhập, điều hướng về trang login
        next("/login");
    } else {
        // Nếu đã đăng nhập hoặc không cần bảo mật, cho phép điều hướng
        next();
    }
});

export default router;
