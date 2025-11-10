<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-dark-text-primary mb-8">
        よくある質問
      </h1>
      <div class="max-w-3xl mx-auto space-y-4">
        <BaseCard
          v-for="(faq, index) in faqs"
          :key="index"
          :hover="false"
          @click="toggleFaq(index)"
          class="cursor-pointer"
        >
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-lg text-gray-900 dark:text-dark-text-primary">
              {{ faq.question }}
            </h3>
            <span class="text-2xl">{{ openIndex === index ? '−' : '+' }}</span>
          </div>
          <Transition name="fade">
            <p v-if="openIndex === index" class="mt-4 text-gray-700 dark:text-dark-text-secondary">
              {{ faq.answer }}
            </p>
          </Transition>
        </BaseCard>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'

const openIndex = ref<number | null>(null)

const faqs = [
  {
    question: 'WebJobsの利用料金は？',
    answer: 'WebJobsは完全無料でご利用いただけます。求職者・企業ともに登録料や利用料は一切かかりません。',
  },
  {
    question: '応募後の流れは？',
    answer: '応募後、企業からメールで連絡があります。選考のスケジュールや詳細は企業ごとに異なります。',
  },
  {
    question: '複数の求人に応募できますか？',
    answer: 'はい、制限なく複数の求人に応募いただけます。',
  },
  {
    question: '企業アカウントの作成方法は？',
    answer: '新規登録時に「企業」を選択してアカウントを作成してください。審査完了後、求人を投稿できるようになります。',
  },
]

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
