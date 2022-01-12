import {
    createWebHistory,
    createRouter,
} from 'vue-router';
import type { RouterOptions } from 'vue-router';
import Pay from '@/views/Pay.vue'
import Home from '@/views/Home.vue'

const routers: RouterOptions = {
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: 'Pay',
            path: '/pay',
            component: Pay,
            meta: { name: 'Pay' },
        },
        {
            name: 'Home',
            path: '/home',
            component: Home,
            meta: { name: 'Home' },
        },
    ],
};

export default createRouter(routers);
