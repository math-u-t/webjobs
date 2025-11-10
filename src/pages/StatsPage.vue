<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-dark-text-primary mb-12">
        統計情報
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <BaseCard :hover="false" class="text-center">
          <div class="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">5,234</div>
          <div class="text-gray-600 dark:text-dark-text-secondary">総求人数</div>
        </BaseCard>
        <BaseCard :hover="false" class="text-center">
          <div class="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">1,456</div>
          <div class="text-gray-600 dark:text-dark-text-secondary">登録企業数</div>
        </BaseCard>
        <BaseCard :hover="false" class="text-center">
          <div class="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">8,901</div>
          <div class="text-gray-600 dark:text-dark-text-secondary">成約数</div>
        </BaseCard>
      </div>

      <div class="max-w-4xl mx-auto">
        <BaseCard :hover="false" class="mb-8">
          <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text-primary">
            人気カテゴリー
          </h2>
          <div class="space-y-4">
            <div v-for="cat in popularCategories" :key="cat.name" class="flex items-center justify-between">
              <span class="text-gray-700 dark:text-dark-text-primary">{{ cat.name }}</span>
              <div class="flex items-center gap-4">
                <div class="w-64 h-4 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                  <div
                    class="h-full bg-blue-600 dark:bg-blue-500"
                    :style="{ width: `${cat.percentage}%` }"
                  ></div>
                </div>
                <span class="text-sm text-gray-600 dark:text-dark-text-secondary w-12 text-right">
                  {{ cat.count }}件
                </span>
              </div>
            </div>
          </div>
        </BaseCard>

        <BaseCard :hover="false">
          <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text-primary">
            平均給与（年収）
          </h2>
          <div class="text-center">
            <div class="text-5xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
              ¥5,800,000
            </div>
            <p class="text-gray-600 dark:text-dark-text-secondary">
              全職種の平均年収
            </p>
          </div>
        </BaseCard>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'

const popularCategories = [
  { name: 'エンジニア', count: 1234, percentage: 80 },
  { name: 'デザイン', count: 856, percentage: 55 },
  { name: 'マーケティング', count: 643, percentage: 42 },
  { name: 'セールス', count: 521, percentage: 34 },
  { name: 'その他', count: 980, percentage: 63 },
]
</script>
