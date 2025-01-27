<template>
  <div class=" flex items-center justify-center">
    <div class=" shadow-xl overflow-hidden">
      <div class=" py-10 px-2.5 text-neutral-600 text-center">
        <h1 class="text-2xl font-bold">
          Mapeamento de Necessidades
        </h1>
        <p class=" text-lg py-5">
          Entenda suas necessidades digitais e receba soluções personalizadas para impulsionar seu negócio
        </p>
        <img class=" w-72 h-auto mx-auto py-10" src="@/assets/images/map.svg" alt="mapeamento de necessidades" />
        <Button  size="lg" variant="primary" @click="emit('next')">
          Começar Jornada
          <MoveRight :size="25" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MoveRight } from 'lucide-vue-next';
import Button from '@/components/Buttons/Button.vue';
const emit = defineEmits(['next'])
</script>