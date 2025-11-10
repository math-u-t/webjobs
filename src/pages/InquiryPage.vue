<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-dark-text-primary mb-8">
          お問い合わせ
        </h1>
        <BaseCard :hover="false">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <BaseInput v-model="form.name" label="お名前" required />
            <BaseInput v-model="form.email" type="email" label="メールアドレス" required />
            <BaseSelect
              v-model="form.category"
              label="カテゴリー"
              :options="categories"
              required
            />
            <BaseInput v-model="form.subject" label="件名" required />
            <div>
              <label class="label">お問い合わせ内容</label>
              <textarea
                v-model="form.message"
                rows="6"
                class="input"
                required
              ></textarea>
            </div>
            <BaseButton type="submit" variant="primary" size="lg" :loading="loading" full-width>
              送信する
            </BaseButton>
          </form>
        </BaseCard>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUiStore } from '@/stores/ui'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const uiStore = useUiStore()
const loading = ref(false)

const form = reactive({
  name: '',
  email: '',
  category: 'general',
  subject: '',
  message: '',
})

const categories = [
  { label: '一般的な質問', value: 'general' },
  { label: '技術的な問題', value: 'technical' },
  { label: '料金について', value: 'billing' },
  { label: 'その他', value: 'other' },
]

const handleSubmit = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    uiStore.showToast('お問い合わせを送信しました', 'success')
    Object.keys(form).forEach(key => form[key as keyof typeof form] = '')
  } catch (error) {
    uiStore.showToast('送信に失敗しました', 'error')
  } finally {
    loading.value = false
  }
}
</script>
