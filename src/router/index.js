import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/playlist',
        name: 'itemMusic',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "itemMusic" */ '../views/itemMusic.vue')
    },
    {
        path: '/search',
        name: 'SearchView',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "searchView" */ '../views/searchView.vue')
    },
    {
        path: '/login',
        name: 'LoginView',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "loginView" */ '../views/loginView.vue')
    },
    {
        path: '/infoUser',
        name: 'InfoUserView',
        beforeEnter: (to, from, next) => {
            // 判断是否登录
            if(store.state.isLogin ||store.state.token || localStorage.getItem('token')){
                next()
            }else{
                next('/login')
            }
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "infoUserView" */ '../views/infoUserView.vue')
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes, 
})

// 全局路由守卫（登录页面不用footer）
router.beforeEach((to, from)=>{
    if(to.path == '/login'){
        store.state.isFooterMusic = false;
    }else{
        store.state.isFooterMusic = true;
    }
})

export default router
