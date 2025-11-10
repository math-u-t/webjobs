import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Toast, ToastType } from '@/types'

export const useUiStore = defineStore('ui', () => {
  const sidebarOpen = ref(false)
  const modalState = ref<{ isOpen: boolean; component?: string; props?: any }>({
    isOpen: false,
  })
  const toasts = ref<Toast[]>([])

  // Sidebar
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const openSidebar = () => {
    sidebarOpen.value = true
  }

  const closeSidebar = () => {
    sidebarOpen.value = false
  }

  // Modal
  const openModal = (component?: string, props?: any) => {
    modalState.value = { isOpen: true, component, props }
  }

  const closeModal = () => {
    modalState.value = { isOpen: false }
  }

  // Toast notifications
  const showToast = (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const toast: Toast = { id, message, type, duration }
    toasts.value.push(toast)

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  const clearToasts = () => {
    toasts.value = []
  }

  return {
    sidebarOpen,
    modalState,
    toasts,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    openModal,
    closeModal,
    showToast,
    removeToast,
    clearToasts,
  }
})
