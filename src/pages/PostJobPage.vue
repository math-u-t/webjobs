<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-8">
        求人投稿
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <BaseCard :hover="false">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <BaseInput
                v-model="form.title"
                label="求人タイトル"
                placeholder="例: フロントエンドエンジニア募集"
                required
                :error="errors.title"
              />

              <div>
                <label class="label">説明</label>
                <textarea
                  v-model="form.description"
                  rows="8"
                  class="input"
                  placeholder="求人の詳細を入力してください"
                ></textarea>
              </div>

              <BaseInput
                v-model="form.company"
                label="会社名"
                required
                :error="errors.company"
              />

              <BaseInput
                v-model="form.location"
                label="勤務地"
                placeholder="例: 東京都渋谷区"
                required
                :error="errors.location"
              />

              <BaseSelect
                v-model="form.employmentType"
                label="雇用形態"
                :options="employmentTypes"
                required
              />

              <div class="grid grid-cols-2 gap-4">
                <BaseInput
                  v-model="form.salaryMin"
                  type="number"
                  label="最低給与（万円）"
                  placeholder="400"
                />
                <BaseInput
                  v-model="form.salaryMax"
                  type="number"
                  label="最高給与（万円）"
                  placeholder="800"
                />
              </div>

              <BaseInput
                v-model="form.category"
                label="カテゴリー"
                placeholder="例: エンジニア"
                required
              />

              <div>
                <label class="label">タグ（カンマ区切り）</label>
                <BaseInput
                  v-model="tagsInput"
                  placeholder="例: React, TypeScript, リモート"
                />
                <div v-if="form.tags.length > 0" class="flex flex-wrap gap-2 mt-2">
                  <BaseBadge
                    v-for="(tag, index) in form.tags"
                    :key="index"
                    variant="primary"
                  >
                    {{ tag }}
                    <button
                      type="button"
                      class="ml-2 text-xs"
                      @click="removeTag(index)"
                    >
                      ×
                    </button>
                  </BaseBadge>
                </div>
              </div>

              <div class="flex gap-4">
                <BaseButton type="submit" variant="primary" :loading="loading">
                  投稿する
                </BaseButton>
                <BaseButton type="button" variant="outline" @click="saveDraft">
                  下書き保存
                </BaseButton>
              </div>
            </form>
          </BaseCard>
        </div>

        <div class="lg:col-span-1">
          <BaseCard :hover="false">
            <h3 class="font-semibold text-lg mb-4 text-gray-900 dark:text-dark-text-primary">
              プレビュー
            </h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-xl text-gray-900 dark:text-dark-text-primary">
                  {{ form.title || '求人タイトル' }}
                </h4>
                <p class="text-gray-600 dark:text-dark-text-secondary">
                  {{ form.company || '会社名' }}
                </p>
              </div>
              <div class="flex flex-wrap gap-2">
                <BaseBadge variant="primary">{{ form.employmentType || '雇用形態' }}</BaseBadge>
                <BaseBadge v-for="tag in form.tags" :key="tag" variant="gray">
                  {{ tag }}
                </BaseBadge>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseBadge from '@/components/common/BaseBadge.vue'

const router = useRouter()
const uiStore = useUiStore()

const loading = ref(false)
const tagsInput = ref('')

const form = reactive({
  title: '',
  description: '',
  company: '',
  location: '',
  employmentType: 'full-time',
  salaryMin: '',
  salaryMax: '',
  category: '',
  tags: [] as string[],
})

const errors = reactive({
  title: '',
  company: '',
  location: '',
})

const employmentTypes = [
  { label: '正社員', value: 'full-time' },
  { label: '契約社員', value: 'contract' },
  { label: 'パート・アルバイト', value: 'part-time' },
  { label: 'インターン', value: 'internship' },
]

watch(tagsInput, (value) => {
  if (value.includes(',')) {
    const tags = value.split(',').map(t => t.trim()).filter(Boolean)
    form.tags = [...new Set([...form.tags, ...tags])]
    tagsInput.value = ''
  }
})

const removeTag = (index: number) => {
  form.tags.splice(index, 1)
}

const handleSubmit = async () => {
  // Clear errors
  Object.keys(errors).forEach(key => errors[key as keyof typeof errors] = '')

  // Validate
  if (!form.title) {
    errors.title = 'タイトルを入力してください'
    return
  }

  loading.value = true
  try {
    // TODO: Submit to API
    await new Promise(resolve => setTimeout(resolve, 1000))
    uiStore.showToast('求人を投稿しました', 'success')
    router.push('/jobs')
  } catch (error) {
    uiStore.showToast('投稿に失敗しました', 'error')
  } finally {
    loading.value = false
  }
}

const saveDraft = () => {
  localStorage.setItem('job_draft', JSON.stringify(form))
  uiStore.showToast('下書きを保存しました', 'success')
}
</script>
