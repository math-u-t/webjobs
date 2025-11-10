<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
          求人一覧
        </h1>
        <p class="text-gray-600 dark:text-dark-text-secondary">
          全{{ jobCount }}件の求人から検索
        </p>
      </div>

      <!-- Search Bar -->
      <div class="mb-6">
        <BaseInput
          v-model="searchQuery"
          type="text"
          placeholder="キーワードで検索..."
          @update:modelValue="handleSearch"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <aside class="lg:col-span-1">
          <BaseCard :hover="false">
            <h3 class="font-semibold text-lg mb-4 text-gray-900 dark:text-dark-text-primary">
              絞り込み
            </h3>

            <div class="space-y-6">
              <!-- Category -->
              <div>
                <label class="label">カテゴリー</label>
                <BaseSelect
                  v-model="filters.category"
                  :options="categories"
                  placeholder="すべて"
                  @update:modelValue="applyFilters"
                />
              </div>

              <!-- Location -->
              <div>
                <label class="label">勤務地</label>
                <BaseInput
                  v-model="filters.location"
                  type="text"
                  placeholder="東京都"
                  @update:modelValue="applyFilters"
                />
              </div>

              <!-- Employment Type -->
              <div>
                <label class="label">雇用形態</label>
                <div class="space-y-2">
                  <label v-for="type in employmentTypes" :key="type.value" class="flex items-center">
                    <input
                      type="checkbox"
                      :value="type.value"
                      v-model="filters.employmentTypes"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      @change="applyFilters"
                    />
                    <span class="ml-2 text-sm text-gray-700 dark:text-dark-text-primary">
                      {{ type.label }}
                    </span>
                  </label>
                </div>
              </div>

              <BaseButton variant="outline" size="sm" full-width @click="resetFilters">
                フィルターをリセット
              </BaseButton>
            </div>
          </BaseCard>
        </aside>

        <!-- Jobs List -->
        <div class="lg:col-span-3">
          <div class="flex justify-between items-center mb-6">
            <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
              {{ filteredJobs.length }}件の求人
            </div>
            <BaseSelect
              v-model="sortField"
              :options="sortOptions"
              @update:modelValue="handleSort"
            />
          </div>

          <div v-if="loading" class="space-y-4">
            <div v-for="i in 5" :key="i" class="card">
              <div class="animate-pulse">
                <div class="h-4 bg-gray-200 dark:bg-dark-border rounded w-3/4 mb-4"></div>
                <div class="h-3 bg-gray-200 dark:bg-dark-border rounded w-1/2 mb-2"></div>
                <div class="h-3 bg-gray-200 dark:bg-dark-border rounded w-full"></div>
              </div>
            </div>
          </div>

          <div v-else-if="filteredJobs.length === 0">
            <EmptyState
              title="求人が見つかりませんでした"
              description="検索条件を変更してお試しください"
            >
              <template #action>
                <BaseButton variant="primary" @click="resetFilters">
                  フィルターをリセット
                </BaseButton>
              </template>
            </EmptyState>
          </div>

          <div v-else class="space-y-4">
            <BaseCard
              v-for="job in paginatedJobs"
              :key="job.id"
              class="cursor-pointer"
              @click="router.push(`/jobs/${job.id}`)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="font-semibold text-xl text-gray-900 dark:text-dark-text-primary mb-2">
                    {{ job.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-dark-text-secondary mb-3">
                    {{ job.company }}
                  </p>
                  <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-dark-text-secondary mb-4">
                    <span>📍 {{ job.location }}</span>
                    <span>💰 {{ formatSalary(job.salaryMin, job.salaryMax) }}</span>
                    <span>📅 {{ formatDate(job.postedAt) }}</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <BaseBadge variant="primary">{{ job.employmentType }}</BaseBadge>
                    <BaseBadge v-for="tag in job.tags" :key="tag" variant="gray">
                      {{ tag }}
                    </BaseBadge>
                  </div>
                </div>
              </div>
            </BaseCard>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-8">
            <BasePagination
              :current-page="currentPage"
              :total-pages="totalPages"
              @update:current-page="currentPage = $event"
            />
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseBadge from '@/components/common/BaseBadge.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import type { Job } from '@/types'

const router = useRouter()

const loading = ref(false)
const searchQuery = ref('')
const sortField = ref('postedAt')
const currentPage = ref(1)
const pageSize = 10

const filters = reactive({
  category: '',
  location: '',
  employmentTypes: [] as string[],
})

const categories = [
  { label: 'すべて', value: '' },
  { label: 'エンジニア', value: 'engineer' },
  { label: 'デザイン', value: 'design' },
  { label: 'マーケティング', value: 'marketing' },
]

const employmentTypes = [
  { label: '正社員', value: 'full-time' },
  { label: '契約社員', value: 'contract' },
  { label: 'パート・アルバイト', value: 'part-time' },
  { label: 'インターン', value: 'internship' },
]

const sortOptions = [
  { label: '新着順', value: 'postedAt' },
  { label: '給与が高い順', value: 'salary' },
]

const jobs = ref<Job[]>([])

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    if (searchQuery.value && !job.title.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false
    }
    if (filters.category && job.category !== filters.category) {
      return false
    }
    if (filters.location && !job.location.includes(filters.location)) {
      return false
    }
    if (filters.employmentTypes.length > 0 && !filters.employmentTypes.includes(job.employmentType)) {
      return false
    }
    return true
  })
})

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredJobs.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredJobs.value.length / pageSize))
const jobCount = computed(() => jobs.value.length)

const formatSalary = (min?: number, max?: number) => {
  if (!min && !max) return '応相談'
  if (min && max) return `${min}〜${max}万円`
  if (min) return `${min}万円〜`
  return `〜${max}万円`
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ja-JP')
}

const handleSearch = () => {
  currentPage.value = 1
}

const applyFilters = () => {
  currentPage.value = 1
}

const resetFilters = () => {
  searchQuery.value = ''
  filters.category = ''
  filters.location = ''
  filters.employmentTypes = []
  currentPage.value = 1
}

const handleSort = () => {
  // Sort logic
}

onMounted(() => {
  // Load jobs - mock data for now
  jobs.value = []
})
</script>
