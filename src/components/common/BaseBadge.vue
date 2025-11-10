<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'gray',
  size: 'md',
})

const badgeClasses = computed(() => {
  const classes = ['badge']

  // Variant styles
  switch (props.variant) {
    case 'primary':
      classes.push('badge-primary')
      break
    case 'secondary':
      classes.push('badge-secondary')
      break
    case 'success':
      classes.push('bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300')
      break
    case 'warning':
      classes.push('bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300')
      break
    case 'danger':
      classes.push('bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300')
      break
    case 'gray':
      classes.push('badge-gray')
      break
  }

  // Size styles
  switch (props.size) {
    case 'sm':
      classes.push('text-xs px-2 py-0.5')
      break
    case 'md':
      classes.push('text-sm px-3 py-1')
      break
    case 'lg':
      classes.push('text-base px-4 py-1.5')
      break
  }

  return classes.join(' ')
})
</script>
