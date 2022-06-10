import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/post/:id',
    name: 'singlePost',
    component: () => import('../views/SinglePost.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../views/TrendView.vue')
  },
  {
    path: '/user/:id',
    name: 'single-user',
    component: () => import('../views/UserWillView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/UserView.vue')
  },
  {
    path: '/likes',
    name: 'likes',
    component: () => import('../views/LikesView.vue')
  },
  {
    path: '/following',
    name: 'following',
    component: () => import('../views/FollowingView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
