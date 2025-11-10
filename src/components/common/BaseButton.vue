<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <LoadingSpinner v-if="loading" class="w-4 h-4 mr-2" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const classes = ['btn inline-flex items-center justify-center']

  // Variant styles
  switch (props.variant) {
    case 'primary':
      classes.push('btn-primary')
      break
    case 'secondary':
      classes.push('btn-secondary')
      break
    case 'outline':
      classes.push('btn-outline')
      break
    case 'ghost':
      classes.push(
        'bg-transparent hover:bg-gray-100 dark:hover:bg-dark-surface text-gray-700 dark:text-dark-text-primary'
      )
      break
    case 'danger':
      classes.push(
        'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 hover:scale-105 hover:shadow-lg'
      )
      break
  }

  // Size styles
  switch (props.size) {
    case 'sm':
      classes.push('px-3 py-1.5 text-sm')
      break
    case 'md':
      classes.push('px-4 py-2 text-base')
      break
    case 'lg':
      classes.push('px-6 py-3 text-lg')
      break
  }

  // Full width
  if (props.fullWidth) {
    classes.push('w-full')
  }

  return classes.join(' ')
})
</script>
