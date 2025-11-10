/**
 * User types
 */
export type UserType = 'jobseeker' | 'employer'

export interface User {
  id: string
  email: string
  name: string
  userType: UserType
  avatar?: string
  company?: string
  location?: string
  bio?: string
  createdAt: string
  updatedAt: string
}

/**
 * Job types
 */
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance'
export type JobStatus = 'draft' | 'published' | 'closed'

export interface Job {
  id: string
  title: string
  description: string
  company: string
  companyLogo?: string
  location: string
  employmentType: EmploymentType
  salaryMin?: number
  salaryMax?: number
  currency: string
  tags: string[]
  category: string
  requirements: string[]
  benefits: string[]
  status: JobStatus
  postedBy: string
  postedAt: string
  deadline?: string
  viewCount: number
  applicationCount: number
}

/**
 * Application types
 */
export type ApplicationStatus = 'pending' | 'reviewing' | 'accepted' | 'rejected'

export interface Application {
  id: string
  jobId: string
  userId: string
  coverLetter: string
  resumeUrl?: string
  status: ApplicationStatus
  appliedAt: string
  updatedAt: string
}

/**
 * Message types
 */
export interface Message {
  id: string
  senderId: string
  receiverId: string
  jobId?: string
  content: string
  read: boolean
  createdAt: string
}

/**
 * Filters
 */
export interface JobFilters {
  search?: string
  category?: string
  location?: string
  employmentType?: EmploymentType[]
  salaryMin?: number
  salaryMax?: number
  tags?: string[]
}

export interface JobSort {
  field: 'postedAt' | 'salary' | 'deadline'
  order: 'asc' | 'desc'
}

/**
 * API Response types
 */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  message: string
  code?: string
  field?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
}

/**
 * Statistics
 */
export interface Stats {
  totalJobs: number
  totalEmployers: number
  totalApplications: number
  popularCategories: Array<{ name: string; count: number }>
  jobsByLocation: Array<{ location: string; count: number }>
  averageSalary: number
}

/**
 * Toast notification
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

/**
 * Theme
 */
export type Theme = 'light' | 'dark'

/**
 * FAQ
 */
export interface FAQ {
  id: string
  category: string
  question: string
  answer: string
}

/**
 * Inquiry
 */
export type InquiryCategory = 'general' | 'technical' | 'billing' | 'other'

export interface Inquiry {
  name: string
  email: string
  category: InquiryCategory
  subject: string
  message: string
  attachments?: File[]
}
