<template>
  <div class="px-3 py-6 bg-indigo-700/95 rounded-t-lg">
    <div class="flex justify-end mb-2">
      <span class="text-sm text-white">Passo {{ currentStep }} de {{ totalSteps }}</span>
   </div>
    <div class="w-full h-2 bg-black/20 rounded-full">
      <div 
        class="h-full bg-white rounded-full transition-all duration-300 ease-in-out"
        :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  currentStep: {
    type: Number,
    required: true
  },
  totalSteps: {
    type: Number,
    default: 3
  },
})
</script>