import { createRouter, createWebHistory } from 'vue-router'

import applyUserPage from '@/views/apply-user-page'
import applyCompletePage from '@/views/apply-complete-page'
import applyAdminPage from '@/views/admin-vr1-web/apply-admin-page'
import adminMobileMain from '@/views/admin-vr2-mobile/admin-mobile-main'
import adminMobileLogin from '@/views/admin-vr2-mobile/admin-mobile-login'

const baseUrl = process.env.VUE_APP_BASE_URL
console.log('baseURL 확인', baseUrl)
const routes = [
    {
        path: baseUrl + '/apply',
        component: applyUserPage,
    },
    {
        path: baseUrl + '/apply/complete',
        component: applyCompletePage,
    },
    {
        path: baseUrl + '/admin',
        component: applyAdminPage,
    },
    {
        path: baseUrl + 'admin/mobile/login',
        component: adminMobileLogin,
    },
    {
        path: baseUrl + 'admin/mobile/main',
        component: adminMobileMain,
    },
]

const router = createRouter({ history: createWebHistory(baseUrl), routes: routes })

export default router
