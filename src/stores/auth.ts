import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'
import { apiClient } from '@/api/client'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const currentUser = computed(() => user.value)
  const isEmployer = computed(() => user.value?.userType === 'employer')

  // Initialize auth from localStorage
  const initAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  // Login
  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const response = await apiClient.post<{ token: string; user: User }>('/auth/login', {
        email,
        password,
      })

      if (response.data) {
        token.value = response.data.token
        user.value = response.data.user
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }

      return response.data
    } finally {
      loading.value = false
    }
  }

  // Register
  const register = async (data: {
    email: string
    password: string
    name: string
    userType: 'jobseeker' | 'employer'
  }) => {
    loading.value = true
    try {
      const response = await apiClient.post<{ token: string; user: User }>('/auth/register', data)

      if (response.data) {
        token.value = response.data.token
        user.value = response.data.user
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }

      return response.data
    } finally {
      loading.value = false
    }
  }

  // Logout
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Refresh token
  const refreshToken = async () => {
    try {
      const response = await apiClient.post<{ token: string }>('/auth/refresh')
      if (response.data) {
        token.value = response.data.token
        localStorage.setItem('token', response.data.token)
      }
    } catch (error) {
      logout()
      throw error
    }
  }

  // Update user profile
  const updateProfile = async (data: Partial<User>) => {
    loading.value = true
    try {
      const response = await apiClient.put<User>('/users/me', data)
      if (response.data) {
        user.value = response.data
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    currentUser,
    isEmployer,
    initAuth,
    login,
    register,
    logout,
    refreshToken,
    updateProfile,
  }
})
