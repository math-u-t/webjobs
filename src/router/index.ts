import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
      meta: { title: 'ホーム' },
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: () => import('@/pages/JobsPage.vue'),
      meta: { title: '求人一覧' },
    },
    {
      path: '/jobs/:id',
      name: 'job-detail',
      component: () => import('@/pages/JobDetailPage.vue'),
      meta: { title: '求人詳細' },
    },
    {
      path: '/post',
      name: 'post-job',
      component: () => import('@/pages/PostJobPage.vue'),
      meta: { title: '求人投稿', requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/pages/ProfilePage.vue'),
      meta: { title: 'プロフィール', requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: { title: 'ログイン' },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/RegisterPage.vue'),
      meta: { title: '新規登録' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue'),
      meta: { title: 'サービス概要' },
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/pages/FaqPage.vue'),
      meta: { title: 'よくある質問' },
    },
    {
      path: '/inquiry',
      name: 'inquiry',
      component: () => import('@/pages/InquiryPage.vue'),
      meta: { title: 'お問い合わせ' },
    },
    {
      path: '/devs',
      name: 'devs',
      component: () => import('@/pages/DevsPage.vue'),
      meta: { title: '開発者向け' },
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('@/pages/StatsPage.vue'),
      meta: { title: '統計情報' },
    },
    {
      path: '/policy',
      name: 'policy',
      component: () => import('@/pages/PolicyPage.vue'),
      meta: { title: 'プライバシーポリシー' },
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/pages/TermsPage.vue'),
      meta: { title: '利用規約' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('@/pages/ErrorPage.vue'),
      meta: { title: 'ページが見つかりません' },
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guards
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  // Set page title
  const appName = import.meta.env.VITE_APP_NAME || 'WebJobs'
  document.title = to.meta.title ? `${to.meta.title} - ${appName}` : appName

  // Check authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
