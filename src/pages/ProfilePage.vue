<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-8">
        プロフィール
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Info -->
        <div class="lg:col-span-2">
          <BaseCard :hover="false" class="mb-8">
            <h2 class="text-xl font-bold mb-6 text-gray-900 dark:text-dark-text-primary">
              基本情報
            </h2>
            <form @submit.prevent="handleUpdateProfile" class="space-y-6">
              <BaseInput
                v-model="form.name"
                label="名前"
                required
              />

              <BaseInput
                v-model="form.email"
                type="email"
                label="メールアドレス"
                required
              />

              <BaseInput
                v-model="form.location"
                label="所在地"
                placeholder="例: 東京都"
              />

              <div>
                <label class="label">自己紹介</label>
                <textarea
                  v-model="form.bio"
                  rows="4"
                  class="input"
                  placeholder="簡単な自己紹介を入力してください"
                ></textarea>
              </div>

              <BaseButton type="submit" variant="primary" :loading="loading">
                保存
              </BaseButton>
            </form>
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <BaseCard :hover="false">
            <div class="text-center mb-6">
              <div class="w-24 h-24 mx-auto rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                {{ authStore.currentUser?.name.charAt(0).toUpperCase() }}
              </div>
              <h3 class="font-semibold text-lg text-gray-900 dark:text-dark-text-primary">
                {{ authStore.currentUser?.name }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-dark-text-secondary">
                {{ authStore.currentUser?.email }}
              </p>
              <BaseBadge :variant="authStore.isEmployer ? 'primary' : 'secondary'" class="mt-2">
                {{ authStore.isEmployer ? '企業' : '求職者' }}
              </BaseBadge>
            </div>

            <div class="pt-6 border-t border-gray-200 dark:border-dark-border">
              <BaseButton variant="outline" full-width @click="handleLogout">
                ログアウト
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseBadge from '@/components/common/BaseBadge.vue'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUiStore()

const loading = ref(false)
const form = reactive({
  name: '',
  email: '',
  location: '',
  bio: '',
})

onMounted(() => {
  if (authStore.currentUser) {
    form.name = authStore.currentUser.name
    form.email = authStore.currentUser.email
    form.location = authStore.currentUser.location || ''
    form.bio = authStore.currentUser.bio || ''
  }
})

const handleUpdateProfile = async () => {
  loading.value = true
  try {
    await authStore.updateProfile(form)
    uiStore.showToast('プロフィールを更新しました', 'success')
  } catch (error) {
    uiStore.showToast('更新に失敗しました', 'error')
  } finally {
    loading.value = false
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
  uiStore.showToast('ログアウトしました', 'success')
}
</script>
