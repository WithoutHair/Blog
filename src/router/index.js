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
        {path: '/', name: 'Zhuye', component: () => import('@/pages/Home/components/Zhuye')},
        {path: '/time', name: 'Time', component: () => import('@/pages/Home/components/Time')},
        {path: '/about', name: 'About', component: () => import('@/pages/Home/components/About')},
        {path: '/article/:id', name: 'Article', component: () => import('@/pages/Home/components/Article')},
        {path: '/login', name: 'Login', component: () => import('@/pages/Login/Login')},
        {path: '/dashboard', name: 'Dashboard', component: () => import('@/pages/Dashboard/Dashboard')},
        {path: '/editor', name: 'Editor', component: () => import('@/pages/Dashboard/components/Editor')}
    ]
})
