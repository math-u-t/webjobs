<template>
  <header class="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-background">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">W</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-dark-text-primary">WebJobs</span>
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary font-medium transition-colors"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
          <!-- Theme Toggle -->
          <button
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
            @click="themeStore.toggleTheme()"
          >
            <svg
              v-if="themeStore.currentTheme === 'light'"
              class="w-5 h-5 text-gray-600 dark:text-dark-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <svg
              v-else
              class="w-5 h-5 text-gray-600 dark:text-dark-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>

          <!-- User Menu or Auth Buttons -->
          <template v-if="authStore.isAuthenticated">
            <div class="relative">
              <button
                class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
                @click="showUserMenu = !showUserMenu"
              >
                <div class="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                  <span class="text-white text-sm font-medium">
                    {{ authStore.currentUser?.name.charAt(0).toUpperCase() }}
                  </span>
                </div>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="fade">
                <div
                  v-if="showUserMenu"
                  v-click-outside="() => (showUserMenu = false)"
                  class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border py-1"
                >
                  <RouterLink
                    to="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-dark-text-primary hover:bg-gray-100 dark:hover:bg-dark-background"
                    @click="showUserMenu = false"
                  >
                    プロフィール
                  </RouterLink>
                  <RouterLink
                    v-if="authStore.isEmployer"
                    to="/post"
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-dark-text-primary hover:bg-gray-100 dark:hover:bg-dark-background"
                    @click="showUserMenu = false"
                  >
                    求人投稿
                  </RouterLink>
                  <button
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-dark-background"
                    @click="handleLogout"
                  >
                    ログアウト
                  </button>
                </div>
              </Transition>
            </div>
          </template>
          <template v-else>
            <RouterLink to="/login">
              <BaseButton variant="outline" size="sm">ログイン</BaseButton>
            </RouterLink>
            <RouterLink to="/register">
              <BaseButton variant="primary" size="sm">新規登録</BaseButton>
            </RouterLink>
          </template>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg
              class="w-6 h-6 text-gray-600 dark:text-dark-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-dark-border">
        <nav class="container mx-auto px-4 py-4 space-y-2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="block px-4 py-2 rounded-lg text-gray-600 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-gray-900 dark:hover:text-dark-text-primary font-medium transition-colors"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useUiStore } from '@/stores/ui'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const uiStore = useUiStore()

const mobileMenuOpen = ref(false)
const showUserMenu = ref(false)

const navLinks = [
  { path: '/jobs', label: '求人一覧' },
  { path: '/about', label: 'サービス概要' },
  { path: '/faq', label: 'FAQ' },
  { path: '/devs', label: '開発者向け' },
]

const handleLogout = () => {
  authStore.logout()
  showUserMenu.value = false
  router.push('/')
  uiStore.showToast('ログアウトしました', 'success')
}

// Click outside directive
interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent?: (event: Event) => void
}

const vClickOutside = {
  mounted(el: ClickOutsideElement, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: ClickOutsideElement) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
