import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'posts',
        meta: {
            componentName: 'PostsList'
        },
        component: () => import('../pages/PostsList.vue')
    },
    {
        path: '/detailed/:id',
        name: 'detailed',
        component: () => import('../pages/PostDetailed.vue')
    },
    {
        path: "/detailed",
        redirect: '/'
    },
    {
        path: '/create-post',
        name: 'create-post',
        component: () => import('../pages/CreateNewPost.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
