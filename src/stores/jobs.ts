import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Job, JobFilters, JobSort, PaginatedResponse } from '@/types'
import { apiClient } from '@/api/client'

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([])
  const currentJob = ref<Job | null>(null)
  const loading = ref(false)
  const filters = ref<JobFilters>({})
  const sort = ref<JobSort>({ field: 'postedAt', order: 'desc' })
  const pagination = ref({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  })

  const filteredJobs = computed(() => {
    let result = [...jobs.value]

    // Apply filters
    if (filters.value.search) {
      const search = filters.value.search.toLowerCase()
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(search) ||
          job.description.toLowerCase().includes(search) ||
          job.company.toLowerCase().includes(search)
      )
    }

    if (filters.value.category) {
      result = result.filter((job) => job.category === filters.value.category)
    }

    if (filters.value.location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(filters.value.location!.toLowerCase())
      )
    }

    if (filters.value.employmentType && filters.value.employmentType.length > 0) {
      result = result.filter((job) => filters.value.employmentType!.includes(job.employmentType))
    }

    if (filters.value.salaryMin) {
      result = result.filter((job) => (job.salaryMin || 0) >= filters.value.salaryMin!)
    }

    if (filters.value.salaryMax) {
      result = result.filter((job) => (job.salaryMax || Infinity) <= filters.value.salaryMax!)
    }

    // Apply sorting
    result.sort((a, b) => {
      const field = sort.value.field
      let aVal: any
      let bVal: any

      if (field === 'salary') {
        aVal = a.salaryMin || 0
        bVal = b.salaryMin || 0
      } else if (field === 'postedAt' || field === 'deadline') {
        aVal = a[field] || ''
        bVal = b[field] || ''
      } else {
        aVal = 0
        bVal = 0
      }

      if (sort.value.order === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    return result
  })

  const jobCount = computed(() => filteredJobs.value.length)

  // Fetch jobs
  const fetchJobs = async (params?: { page?: number; pageSize?: number }) => {
    loading.value = true
    try {
      const response = await apiClient.get<PaginatedResponse<Job>>('/jobs', {
        params: {
          page: params?.page || pagination.value.page,
          pageSize: params?.pageSize || pagination.value.pageSize,
          ...filters.value,
          sortField: sort.value.field,
          sortOrder: sort.value.order,
        },
      })

      if (response.data) {
        jobs.value = response.data.data
        pagination.value = {
          page: response.data.page,
          pageSize: response.data.pageSize,
          total: response.data.total,
          totalPages: response.data.totalPages,
        }
      }
    } finally {
      loading.value = false
    }
  }

  // Fetch job by ID
  const fetchJobById = async (id: string) => {
    loading.value = true
    try {
      const response = await apiClient.get<Job>(`/jobs/${id}`)
      if (response.data) {
        currentJob.value = response.data
      }
      return response.data
    } finally {
      loading.value = false
    }
  }

  // Create job
  const createJob = async (jobData: Partial<Job>) => {
    loading.value = true
    try {
      const response = await apiClient.post<Job>('/jobs', jobData)
      if (response.data) {
        jobs.value.unshift(response.data)
      }
      return response.data
    } finally {
      loading.value = false
    }
  }

  // Update job
  const updateJob = async (id: string, jobData: Partial<Job>) => {
    loading.value = true
    try {
      const response = await apiClient.put<Job>(`/jobs/${id}`, jobData)
      if (response.data) {
        const index = jobs.value.findIndex((j) => j.id === id)
        if (index !== -1) {
          jobs.value[index] = response.data
        }
        if (currentJob.value?.id === id) {
          currentJob.value = response.data
        }
      }
      return response.data
    } finally {
      loading.value = false
    }
  }

  // Delete job
  const deleteJob = async (id: string) => {
    loading.value = true
    try {
      await apiClient.delete(`/jobs/${id}`)
      jobs.value = jobs.value.filter((j) => j.id !== id)
      if (currentJob.value?.id === id) {
        currentJob.value = null
      }
    } finally {
      loading.value = false
    }
  }

  // Update filters
  const updateFilters = (newFilters: Partial<JobFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  // Update sort
  const updateSort = (newSort: JobSort) => {
    sort.value = newSort
  }

  // Reset filters
  const resetFilters = () => {
    filters.value = {}
  }

  return {
    jobs,
    currentJob,
    loading,
    filters,
    sort,
    pagination,
    filteredJobs,
    jobCount,
    fetchJobs,
    fetchJobById,
    createJob,
    updateJob,
    deleteJob,
    updateFilters,
    updateSort,
    resetFilters,
  }
})
