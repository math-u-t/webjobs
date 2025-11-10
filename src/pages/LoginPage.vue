<template>
  <DefaultLayout>
    <div class="min-h-screen flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
            ログイン
          </h1>
          <p class="text-gray-600 dark:text-dark-text-secondary">
            アカウントにログインしてください
          </p>
        </div>

        <BaseCard :hover="false">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <BaseInput
              v-model="form.email"
              type="email"
              label="メールアドレス"
              placeholder="example@email.com"
              required
              :error="errors.email"
            />

            <BaseInput
              v-model="form.password"
              type="password"
              label="パスワード"
              placeholder="••••••••"
              required
              :error="errors.password"
            />

            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="form.remember"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-600 dark:text-dark-text-secondary">
                  ログイン状態を保持
                </span>
              </label>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-700">
                パスワードを忘れた方
              </a>
            </div>

            <BaseButton type="submit" variant="primary" size="lg" :loading="loading" full-width>
              ログイン
            </BaseButton>
          </form>

          <div class="mt-6 text-center text-sm">
            <span class="text-gray-600 dark:text-dark-text-secondary">
              アカウントをお持ちでない方は
            </span>
            <RouterLink to="/register" class="text-blue-600 hover:text-blue-700 font-medium ml-1">
              新規登録
            </RouterLink>
          </div>
        </BaseCard>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const uiStore = useUiStore()

const loading = ref(false)
const form = reactive({
  email: '',
  password: '',
  remember: false,
})
const errors = reactive({
  email: '',
  password: '',
})

const handleSubmit = async () => {
  // Clear errors
  errors.email = ''
  errors.password = ''

  // Validate
  if (!form.email) {
    errors.email = 'メールアドレスを入力してください'
    return
  }
  if (!form.password) {
    errors.password = 'パスワードを入力してください'
    return
  }

  loading.value = true
  try {
    await authStore.login(form.email, form.password)
    uiStore.showToast('ログインしました', 'success')

    const redirect = route.query.redirect as string || '/'
    router.push(redirect)
  } catch (error: any) {
    uiStore.showToast(error.response?.data?.message || 'ログインに失敗しました', 'error')
  } finally {
    loading.value = false
  }
}
</script>
