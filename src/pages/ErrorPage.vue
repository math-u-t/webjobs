<template>
  <DefaultLayout>
    <div class="min-h-screen flex items-center justify-center px-4">
      <div class="text-center">
        <h1 class="text-9xl font-bold text-gray-200 dark:text-dark-border mb-4">404</h1>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
          ページが見つかりません
        </h2>
        <p class="text-gray-600 dark:text-dark-text-secondary mb-8 max-w-md mx-auto">
          お探しのページは削除されたか、URLが間違っている可能性があります。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/">
            <BaseButton variant="primary" size="lg">ホームに戻る</BaseButton>
          </RouterLink>
          <RouterLink to="/jobs">
            <BaseButton variant="outline" size="lg">求人を探す</BaseButton>
          </RouterLink>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseButton from '@/components/common/BaseButton.vue'
</script>
