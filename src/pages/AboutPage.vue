<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-dark-text-primary mb-8">
        WebJobsについて
      </h1>
      <div class="max-w-3xl mx-auto prose dark:prose-invert">
        <BaseCard :hover="false" class="mb-8">
          <h2>ミッション</h2>
          <p class="text-gray-700 dark:text-dark-text-secondary">
            WebJobsは、求職者と企業をつなぎ、理想のキャリアを実現するためのプラットフォームです。
            すべての人が自分にぴったりの仕事を見つけられる世界を目指しています。
          </p>
        </BaseCard>
        <BaseCard :hover="false" class="mb-8">
          <h2>ビジョン</h2>
          <p class="text-gray-700 dark:text-dark-text-secondary">
            テクノロジーの力で、より良い雇用機会を創出し、社会に貢献します。
          </p>
        </BaseCard>
        <BaseCard :hover="false">
          <h2>サービスの使い方</h2>
          <ol class="text-gray-700 dark:text-dark-text-secondary">
            <li>無料でアカウントを作成</li>
            <li>プロフィールを登録</li>
            <li>気になる求人を検索</li>
            <li>ワンクリックで応募</li>
          </ol>
        </BaseCard>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'
</script>
