import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index.js'
const routes = [{
    path: '/',
    name: 'Home',
    component: Home
},
{
    path: '/itemMusic',
    name: 'ItemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/ItemMusic.vue')
},
{
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/Search.vue')
}, {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/Login.vue')
},
{
    path: '/userInfo',
    name: 'UserInfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    beforeEnter(to, from, next) {
        if (store.state.isLogin || store.state.token || sessionStorage.getItem('token')) {
            next();
        } else {
            next('/login')
        }
    },
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/UserInfo.vue')
},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from) => {
    if (to.path == '/login') {
        store.state.isFooterMusicShow = false;
    } else {
        store.state.isFooterMusicShow = true;
    }
})

export default router