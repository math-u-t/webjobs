<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="border-b border-gray-200 dark:border-dark-border pb-4 mb-4">
      <slot name="header" />
    </div>
    <div>
      <slot />
    </div>
    <div v-if="$slots.footer" class="border-t border-gray-200 dark:border-dark-border pt-4 mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hover: true,
  padding: 'md',
})

const cardClasses = computed(() => {
  const classes = ['bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg transition-all duration-300']

  if (props.hover) {
    classes.push('hover:shadow-xl hover:-translate-y-1 cursor-pointer')
  }

  switch (props.padding) {
    case 'none':
      break
    case 'sm':
      classes.push('p-4')
      break
    case 'md':
      classes.push('p-6')
      break
    case 'lg':
      classes.push('p-8')
      break
  }

  return classes.join(' ')
})
</script>
