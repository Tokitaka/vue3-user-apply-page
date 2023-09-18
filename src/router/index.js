import { createRouter, createWebHistory } from 'vue-router'

import applyUserPage from '@/views/apply-user-page'
import applyAdminPage from '@/views/apply-admin-page'

const baseUrl = process.env.VUE_APP_BASE_URL
console.log('baseURL 확인', baseUrl)
const routes = [
    {
        path: '/user',
        component: applyUserPage,
    },
    {
        path: '/admin',
        component: applyAdminPage,
    },
]

const router = createRouter({ history: createWebHistory(baseUrl), routes: routes })

export default router
