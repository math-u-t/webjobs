<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-1 bg-gray-50 dark:bg-dark-background">
      <slot />
    </main>
    <TheFooter />
    <BaseToast />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import BaseToast from '@/components/common/BaseToast.vue'
</script>
