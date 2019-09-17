import Vue from 'vue'
import Router from 'vue-router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(Router)
Vue.use(mavonEditor)
/* eslint-disable no-new */

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', name: 'Zhuye', component: () => import('@/pages/Home/components/Default')},
        {path: '/time', name: 'Time', component: () => import('@/pages/Home/components/Time')},
        {path: '/about', name: 'About', component: () => import('@/pages/Home/components/About')},
        {path: '/article/:id', name: 'Article', component: () => import('@/pages/Home/components/Article')},
        {path: '/category/:tag', name: 'Category', component: () => import('@/pages/Home/components/Category')},
        {path: '/login', name: 'Login', component: () => import('@/pages/Login/Login')},
        {path: '/profile', name: 'Profile', component: () => import('@/pages/Dashboard/components/Profile')},
        {path: '/blog', name: 'Blog', component: () => import('@/pages/Dashboard/components/Blog')},
        {path: '/draft', name: 'Draft', component: () => import('@/pages/Dashboard/components/Draft')},
        {path: '/depot', name: 'Depot', component: () => import('@/pages/Dashboard/components/Depot')},
        {path: '/editor', name: 'Editor', component: () => import('@/pages/Dashboard/components/Editor')}
    ],
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0, y: localStorage.y
        }
    }
})
