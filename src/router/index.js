import { createRouter, createWebHistory } from 'vue-router'

import applyUserPage from '@/views/apply-user-page'
import applyCompletePage from '@/views/apply-complete-page'
import applyAdminPage from '@/views/apply-admin-page'
import applyAdminMobile from '@/views/apply-admin-mobile'

const baseUrl = process.env.VUE_APP_BASE_URL
console.log('baseURL 확인', baseUrl)
const routes = [
    {
        path: '/apply',
        component: applyUserPage,
    },
    {
        path: '/apply/complete',
        component: applyCompletePage,
    },
    {
        path: '/admin',
        component: applyAdminPage,
    },
    {
        path: '/admin/mobile',
        component: applyAdminMobile,
    },
]

const router = createRouter({ history: createWebHistory(baseUrl), routes: routes })

export default router
