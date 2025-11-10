<template>
  <footer class="border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-background">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-dark-text-primary mb-4">WebJobs</h3>
          <p class="text-sm text-gray-600 dark:text-dark-text-secondary mb-4">
            求人マッチングプラットフォーム。理想の仕事と出会える場所。
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-sm font-semibold text-gray-900 dark:text-dark-text-primary mb-4">サービス</h4>
          <ul class="space-y-2">
            <li v-for="link in serviceLinks" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-sm text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="text-sm font-semibold text-gray-900 dark:text-dark-text-primary mb-4">企業情報</h4>
          <ul class="space-y-2">
            <li v-for="link in companyLinks" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-sm text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-sm font-semibold text-gray-900 dark:text-dark-text-primary mb-4">サポート</h4>
          <ul class="space-y-2">
            <li v-for="link in supportLinks" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-sm text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-dark-border">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-gray-600 dark:text-dark-text-secondary">
            &copy; {{ currentYear }} WebJobs. All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <RouterLink
              to="/terms"
              class="text-sm text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary"
            >
              利用規約
            </RouterLink>
            <RouterLink
              to="/policy"
              class="text-sm text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary"
            >
              プライバシーポリシー
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const serviceLinks = [
  { path: '/jobs', label: '求人一覧' },
  { path: '/post', label: '求人投稿' },
  { path: '/stats', label: '統計情報' },
]

const companyLinks = [
  { path: '/about', label: 'サービス概要' },
  { path: '/devs', label: '開発者向け' },
]

const supportLinks = [
  { path: '/faq', label: 'よくある質問' },
  { path: '/inquiry', label: 'お問い合わせ' },
]
</script>
