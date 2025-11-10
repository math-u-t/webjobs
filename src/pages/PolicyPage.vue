<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
          プライバシーポリシー
        </h1>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mb-8">
          最終更新日: 2025年1月1日
        </p>

        <div class="prose dark:prose-invert max-w-none">
          <BaseCard :hover="false" class="mb-6">
            <h2>1. 収集する情報</h2>
            <p class="text-gray-700 dark:text-dark-text-secondary">
              WebJobsは、サービス提供のために以下の情報を収集します：
            </p>
            <ul class="text-gray-700 dark:text-dark-text-secondary">
              <li>アカウント情報（氏名、メールアドレスなど）</li>
              <li>プロフィール情報</li>
              <li>利用状況データ</li>
            </ul>
          </BaseCard>

          <BaseCard :hover="false" class="mb-6">
            <h2>2. 情報の利用目的</h2>
            <p class="text-gray-700 dark:text-dark-text-secondary">
              収集した情報は以下の目的で利用します：
            </p>
            <ul class="text-gray-700 dark:text-dark-text-secondary">
              <li>サービスの提供・改善</li>
              <li>ユーザーサポート</li>
              <li>セキュリティ維持</li>
            </ul>
          </BaseCard>

          <BaseCard :hover="false" class="mb-6">
            <h2>3. 情報の共有</h2>
            <p class="text-gray-700 dark:text-dark-text-secondary">
              ユーザーの個人情報を第三者に販売・共有することはありません。
            </p>
          </BaseCard>

          <BaseCard :hover="false">
            <h2>4. お問い合わせ</h2>
            <p class="text-gray-700 dark:text-dark-text-secondary">
              プライバシーポリシーに関するご質問は、お問い合わせフォームからご連絡ください。
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
