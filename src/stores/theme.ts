import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Theme } from '@/types'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<Theme>('light')

  // Initialize theme from localStorage or system preference
  const initTheme = () => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) {
      currentTheme.value = stored
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      currentTheme.value = prefersDark ? 'dark' : 'light'
    }
  }

  // Watch for theme changes and update localStorage
  watch(currentTheme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
  }

  return {
    currentTheme,
    initTheme,
    toggleTheme,
    setTheme,
  }
})
