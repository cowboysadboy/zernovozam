import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import AuthPage from '@/pages/AuthPage.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/auth',
            name: 'Auth',
            component: AuthPage
        }
    ]
})
export default router;