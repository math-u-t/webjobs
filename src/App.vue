<template>
  <div :class="{ dark: isDark }" class="min-h-screen">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.currentTheme === 'dark')
</script>
