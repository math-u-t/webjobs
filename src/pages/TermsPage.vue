<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
          利用規約
        </h1>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mb-8">
          最終更新日: 2025年1月1日
        </p>

        <div class="prose dark:prose-invert max-w-none">
          <BaseCard :hover="false" class="mb-6">
            <h2>1. サービスの利用</h2>
            <p class="text-gray-700 dark:text-dark-text-secondary">
              WebJobsのサービスを利用する際は、本利用規約に同意したものとみなされます。
            </p>
          </BaseCard>

          <BaseCard :hover="false" class="mb-6">
            <h2>2. アカウントの管理</h2>
            <p class="text-gray-700 dark:text-dark-text-secondary">
              ユーザーは自己のアカウント情報を適切に管理する責任があります。
            </p>
          </BaseCard>

          <BaseCard :hover="false" class="mb-6">
            <h2>3. 禁止事項</h2>
            <ul class="text-gray-700 dark:text-dark-text-secondary">
              <li>虚偽の情報の登録</li>
              <li>他者への嫌がらせ</li>
              <li>不正アクセス</li>
              <li>その他、法令に違反する行為</li>
            </ul>
          </BaseCard>

          <BaseCard :hover="false" class="mb-6">
            <h2>4. サービスの変更・停止</h2>
            <p class="text-gray-700 dark:text-dark-text-secondary">
              WebJobsは、事前の通知なくサービスの内容を変更または停止する場合があります。
            </p>
          </BaseCard>

          <BaseCard :hover="false">
            <h2>5. 免責事項</h2>
            <p class="text-gray-700 dark:text-dark-text-secondary">
              WebJobsは、サービスの利用により生じた損害について一切の責任を負いません。
            </p>
          </BaseCard>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'
</script>
