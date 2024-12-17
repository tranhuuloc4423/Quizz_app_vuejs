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
        meta: { requiresAuth: true },
    },
    {
        path: "/manage-quiz/:id",
        name: "ManageQuizComponent",
        component: ManageQuizComponent,
        props: true,
        meta: { requiresAuth: true },
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
    const isAuthenticated = localStorage.getItem("QuizAuth");

    if (to.meta.requiresAuth && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default router;
