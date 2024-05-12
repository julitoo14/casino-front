import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Blackjack from "./views/Blackjack.vue";



const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path:'/blackjack',
        component: Blackjack,
        meta: {
            requiresAuth: true
        }
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    if (to.meta.requiresAuth && !token) {
        next("/");
    } else if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const expirationDate = new Date(decodedToken.exp);
        if (expirationDate <= new Date()) {
            localStorage.removeItem("token");
            next("/");
        } else {
            next();
        }
    } else {
        next();
    }
});


export { router };