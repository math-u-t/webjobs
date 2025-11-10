<template>
  <DefaultLayout>
    <div v-if="loading" class="container mx-auto px-4 py-8">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-dark-border rounded w-1/2 mb-4"></div>
        <div class="h-4 bg-gray-200 dark:bg-dark-border rounded w-1/4 mb-8"></div>
        <div class="h-64 bg-gray-200 dark:bg-dark-border rounded"></div>
      </div>
    </div>

    <div v-else-if="job" class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
            {{ job.title }}
          </h1>

          <div class="flex items-center gap-4 mb-6">
            <span class="text-xl text-gray-600 dark:text-dark-text-secondary">{{ job.company }}</span>
          </div>

          <div class="flex flex-wrap gap-2 mb-8">
            <BaseBadge variant="primary">{{ job.employmentType }}</BaseBadge>
            <BaseBadge v-for="tag in job.tags" :key="tag" variant="gray">{{ tag }}</BaseBadge>
          </div>

          <BaseCard :hover="false" class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
              求人概要
            </h2>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500 dark:text-dark-text-secondary">勤務地</span>
                <p class="text-gray-900 dark:text-dark-text-primary font-medium">{{ job.location }}</p>
              </div>
              <div>
                <span class="text-gray-500 dark:text-dark-text-secondary">給与</span>
                <p class="text-gray-900 dark:text-dark-text-primary font-medium">
                  {{ formatSalary(job.salaryMin, job.salaryMax) }}
                </p>
              </div>
              <div>
                <span class="text-gray-500 dark:text-dark-text-secondary">雇用形態</span>
                <p class="text-gray-900 dark:text-dark-text-primary font-medium">{{ job.employmentType }}</p>
              </div>
              <div>
                <span class="text-gray-500 dark:text-dark-text-secondary">掲載日</span>
                <p class="text-gray-900 dark:text-dark-text-primary font-medium">{{ formatDate(job.postedAt) }}</p>
              </div>
            </div>
          </BaseCard>

          <BaseCard :hover="false" class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
              仕事内容
            </h2>
            <div class="prose dark:prose-invert max-w-none">
              <p class="text-gray-700 dark:text-dark-text-secondary whitespace-pre-line">
                {{ job.description }}
              </p>
            </div>
          </BaseCard>

          <BaseCard v-if="job.requirements.length > 0" :hover="false" class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
              応募要件
            </h2>
            <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-dark-text-secondary">
              <li v-for="req in job.requirements" :key="req">{{ req }}</li>
            </ul>
          </BaseCard>

          <BaseCard v-if="job.benefits.length > 0" :hover="false">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
              福利厚生
            </h2>
            <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-dark-text-secondary">
              <li v-for="benefit in job.benefits" :key="benefit">{{ benefit }}</li>
            </ul>
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-20">
            <BaseCard :hover="false">
              <BaseButton
                v-if="authStore.isAuthenticated"
                variant="primary"
                size="lg"
                full-width
                @click="handleApply"
              >
                応募する
              </BaseButton>
              <RouterLink v-else to="/login">
                <BaseButton variant="primary" size="lg" full-width>
                  ログインして応募
                </BaseButton>
              </RouterLink>

              <div class="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                <h3 class="font-semibold mb-4 text-gray-900 dark:text-dark-text-primary">
                  この求人をシェア
                </h3>
                <div class="flex gap-2">
                  <button class="flex-1 p-2 border border-gray-200 dark:border-dark-border rounded hover:bg-gray-50 dark:hover:bg-dark-surface">
                    Twitter
                  </button>
                  <button class="flex-1 p-2 border border-gray-200 dark:border-dark-border rounded hover:bg-gray-50 dark:hover:bg-dark-surface">
                    Facebook
                  </button>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container mx-auto px-4 py-8">
      <EmptyState
        title="求人が見つかりませんでした"
        description="この求人は削除されたか、存在しません"
      >
        <template #action>
          <RouterLink to="/jobs">
            <BaseButton variant="primary">求人一覧に戻る</BaseButton>
          </RouterLink>
        </template>
      </EmptyState>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseBadge from '@/components/common/BaseBadge.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import type { Job } from '@/types'

const authStore = useAuthStore()
const uiStore = useUiStore()

const loading = ref(true)
const job = ref<Job | null>(null)

const formatSalary = (min?: number, max?: number) => {
  if (!min && !max) return '応相談'
  if (min && max) return `${min}〜${max}万円`
  if (min) return `${min}万円〜`
  return `〜${max}万円`
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ja-JP')
}

const handleApply = () => {
  uiStore.showToast('応募を送信しました', 'success')
}

onMounted(async () => {
  // TODO: Fetch job from API using route.params.id
  setTimeout(() => {
    job.value = null // Mock: job not found
    loading.value = false
  }, 500)
})
</script>
