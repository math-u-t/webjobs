<template>
  <DefaultLayout>
    <div class="min-h-screen flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
            新規登録
          </h1>
          <p class="text-gray-600 dark:text-dark-text-secondary">
            無料でアカウントを作成
          </p>
        </div>

        <BaseCard :hover="false">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="label">ユーザータイプ</label>
              <div class="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  :class="userTypeClasses('jobseeker')"
                  @click="form.userType = 'jobseeker'"
                >
                  <span class="text-2xl mb-2">👤</span>
                  <span class="font-medium">求職者</span>
                </button>
                <button
                  type="button"
                  :class="userTypeClasses('employer')"
                  @click="form.userType = 'employer'"
                >
                  <span class="text-2xl mb-2">🏢</span>
                  <span class="font-medium">企業</span>
                </button>
              </div>
            </div>

            <BaseInput
              v-model="form.name"
              type="text"
              label="名前"
              placeholder="山田 太郎"
              required
              :error="errors.name"
            />

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
              hint="8文字以上、英数字を含む"
              :error="errors.password"
            />

            <BaseInput
              v-model="form.passwordConfirm"
              type="password"
              label="パスワード（確認）"
              placeholder="••••••••"
              required
              :error="errors.passwordConfirm"
            />

            <label class="flex items-start">
              <input
                type="checkbox"
                v-model="form.agreeTerms"
                class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-600 dark:text-dark-text-secondary">
                <RouterLink to="/terms" class="text-blue-600 hover:text-blue-700">利用規約</RouterLink>
                と
                <RouterLink to="/policy" class="text-blue-600 hover:text-blue-700">プライバシーポリシー</RouterLink>
                に同意します
              </span>
            </label>

            <BaseButton type="submit" variant="primary" size="lg" :loading="loading" full-width :disabled="!form.agreeTerms">
              登録する
            </BaseButton>
          </form>

          <div class="mt-6 text-center text-sm">
            <span class="text-gray-600 dark:text-dark-text-secondary">
              既にアカウントをお持ちの方は
            </span>
            <RouterLink to="/login" class="text-blue-600 hover:text-blue-700 font-medium ml-1">
              ログイン
            </RouterLink>
          </div>
        </BaseCard>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import type { UserType } from '@/types'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUiStore()

const loading = ref(false)
const form = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  userType: 'jobseeker' as UserType,
  agreeTerms: false,
})
const errors = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

const userTypeClasses = (type: UserType) => {
  const base = 'flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all'
  return form.userType === type
    ? `${base} border-blue-600 bg-blue-50 dark:bg-blue-900/20`
    : `${base} border-gray-200 dark:border-dark-border hover:border-blue-300`
}

const handleSubmit = async () => {
  // Clear errors
  Object.keys(errors).forEach(key => errors[key as keyof typeof errors] = '')

  // Validate
  if (!form.name) {
    errors.name = '名前を入力してください'
    return
  }
  if (!form.email) {
    errors.email = 'メールアドレスを入力してください'
    return
  }
  if (!form.password || form.password.length < 8) {
    errors.password = 'パスワードは8文字以上で入力してください'
    return
  }
  if (form.password !== form.passwordConfirm) {
    errors.passwordConfirm = 'パスワードが一致しません'
    return
  }

  loading.value = true
  try {
    await authStore.register({
      name: form.name,
      email: form.email,
      password: form.password,
      userType: form.userType,
    })
    uiStore.showToast('登録が完了しました', 'success')
    router.push('/')
  } catch (error: any) {
    uiStore.showToast(error.response?.data?.message || '登録に失敗しました', 'error')
  } finally {
    loading.value = false
  }
}
</script>
