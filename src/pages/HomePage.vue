<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6" v-motion-fade-in>
            理想の仕事と出会える場所
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100" v-motion-fade-in>
            WebJobsで、あなたにぴったりの求人を見つけましょう
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center" v-motion-fade-in>
            <RouterLink to="/jobs">
              <BaseButton variant="secondary" size="lg" class="w-full sm:w-auto">
                求人を探す
              </BaseButton>
            </RouterLink>
            <RouterLink to="/register">
              <BaseButton variant="outline" size="lg" class="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white text-white">
                無料で登録
              </BaseButton>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center" v-motion-slide-up>
            <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">5,000+</div>
            <div class="text-gray-600 dark:text-dark-text-secondary">掲載求人数</div>
          </div>
          <div class="text-center" v-motion-slide-up>
            <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1,200+</div>
            <div class="text-gray-600 dark:text-dark-text-secondary">登録企業数</div>
          </div>
          <div class="text-center" v-motion-slide-up>
            <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">8,500+</div>
            <div class="text-gray-600 dark:text-dark-text-secondary">成約数</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Categories -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-dark-text-primary">
          人気のカテゴリー
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="category in categories"
            :key="category.name"
            class="card cursor-pointer p-6 text-center"
            @click="navigateToCategory(category.name)"
          >
            <div class="text-3xl mb-3">{{ category.icon }}</div>
            <div class="font-semibold text-gray-900 dark:text-dark-text-primary mb-1">
              {{ category.name }}
            </div>
            <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
              {{ category.count }}件
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Jobs -->
    <section class="py-16 bg-gray-50 dark:bg-dark-background">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-dark-text-primary">
            最新の求人
          </h2>
          <RouterLink to="/jobs">
            <BaseButton variant="outline">すべて見る</BaseButton>
          </RouterLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-if="loading" v-for="i in 6" :key="i" class="card">
            <div class="animate-pulse">
              <div class="h-4 bg-gray-200 dark:bg-dark-border rounded w-3/4 mb-4"></div>
              <div class="h-3 bg-gray-200 dark:bg-dark-border rounded w-1/2 mb-2"></div>
              <div class="h-3 bg-gray-200 dark:bg-dark-border rounded w-full"></div>
            </div>
          </div>
          <div
            v-else
            v-for="job in latestJobs"
            :key="job.id"
            class="card cursor-pointer"
            @click="router.push(`/jobs/${job.id}`)"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="font-semibold text-lg text-gray-900 dark:text-dark-text-primary mb-2">
                  {{ job.title }}
                </h3>
                <p class="text-gray-600 dark:text-dark-text-secondary text-sm mb-2">
                  {{ job.company }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text-secondary mb-3">
              <span>📍 {{ job.location }}</span>
              <span>💰 {{ formatSalary(job.salaryMin, job.salaryMax) }}</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <BaseBadge variant="primary">{{ job.employmentType }}</BaseBadge>
              <BaseBadge v-for="tag in job.tags.slice(0, 2)" :key="tag" variant="gray">
                {{ tag }}
              </BaseBadge>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-dark-text-primary">
          WebJobsの特徴
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">簡単検索</h3>
            <p class="text-gray-600 dark:text-dark-text-secondary">
              多彩なフィルター機能で、あなたにぴったりの求人が見つかります
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">スピード応募</h3>
            <p class="text-gray-600 dark:text-dark-text-secondary">
              登録情報を使って、ワンクリックで応募可能
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">安心・安全</h3>
            <p class="text-gray-600 dark:text-dark-text-secondary">
              厳選された企業のみを掲載。安心してご利用いただけます
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-blue-600 dark:bg-blue-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">今すぐ始めましょう</h2>
        <p class="text-xl mb-8 text-blue-100">無料登録で、すべての機能がご利用いただけます</p>
        <RouterLink to="/register">
          <BaseButton variant="secondary" size="lg">無料で登録する</BaseButton>
        </RouterLink>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseBadge from '@/components/common/BaseBadge.vue'
import type { Job } from '@/types'

const router = useRouter()
const loading = ref(true)
const latestJobs = ref<Job[]>([])

const categories = [
  { name: 'エンジニア', icon: '💻', count: 1234 },
  { name: 'デザイン', icon: '🎨', count: 567 },
  { name: 'マーケティング', icon: '📊', count: 890 },
  { name: 'セールス', icon: '💼', count: 654 },
  { name: '企画', icon: '💡', count: 432 },
  { name: 'カスタマーサポート', icon: '🎧', count: 321 },
  { name: '人事', icon: '👥', count: 234 },
  { name: 'その他', icon: '📝', count: 456 },
]

const formatSalary = (min?: number, max?: number) => {
  if (!min && !max) return '応相談'
  if (min && max) return `${min.toLocaleString()}〜${max.toLocaleString()}万円`
  if (min) return `${min.toLocaleString()}万円〜`
  if (max) return `〜${max.toLocaleString()}万円`
}

const navigateToCategory = (category: string) => {
  router.push({ path: '/jobs', query: { category } })
}

onMounted(async () => {
  // Simulate API call
  setTimeout(() => {
    latestJobs.value = [
      {
        id: '1',
        title: 'フロントエンドエンジニア',
        company: '株式会社テックカンパニー',
        location: '東京都',
        employmentType: 'full-time',
        salaryMin: 500,
        salaryMax: 800,
        currency: 'JPY',
        tags: ['React', 'TypeScript', 'リモート'],
        category: 'エンジニア',
        description: '',
        requirements: [],
        benefits: [],
        status: 'published',
        postedBy: '1',
        postedAt: new Date().toISOString(),
        viewCount: 0,
        applicationCount: 0,
      },
      // Add more mock jobs...
    ]
    loading.value = false
  }, 1000)
})
</script>
