<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-dark-text-primary mb-8">
        開発者向けAPI
      </h1>
      <div class="max-w-4xl mx-auto">
        <BaseCard :hover="false" class="mb-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            API概要
          </h2>
          <p class="text-gray-700 dark:text-dark-text-secondary mb-4">
            WebJobs APIを使用して、求人情報にプログラムからアクセスできます。
          </p>
          <code class="block bg-gray-100 dark:bg-dark-background p-4 rounded">
            Base URL: https://api.webjobs.com/v1
          </code>
        </BaseCard>

        <BaseCard :hover="false" class="mb-8">
          <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            エンドポイント
          </h3>
          <div class="space-y-4">
            <div>
              <code class="text-green-600 font-mono">GET /jobs</code>
              <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">求人一覧を取得</p>
            </div>
            <div>
              <code class="text-green-600 font-mono">GET /jobs/:id</code>
              <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">求人詳細を取得</p>
            </div>
            <div>
              <code class="text-blue-600 font-mono">POST /jobs</code>
              <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">求人を投稿</p>
            </div>
          </div>
        </BaseCard>

        <BaseCard :hover="false">
          <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            認証
          </h3>
          <p class="text-gray-700 dark:text-dark-text-secondary mb-4">
            APIキーをリクエストヘッダーに含めてください：
          </p>
          <code class="block bg-gray-100 dark:bg-dark-background p-4 rounded">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </BaseCard>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'
</script>
