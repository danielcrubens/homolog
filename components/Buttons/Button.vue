<template>
  <button type="button" :class="{
    'flex justify-center items-center gap-3 lg:text-lg font-semibold py-2.5 rounded-md': true,
    ...VariantClass,
    ...SizeClass,
  }" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary'].includes(value);
    },
  },
 size : {
    type: String,
    default: 'default',
    validator(value) {
      return ['default','lg'].includes(value);
    },
  },
});

const VariantClass = computed(() => ({
  'bg-indigo-600 text-white hover:brightness-90': props.variant === 'primary',
  'bg-white text-indigo-600 border border-indigo-600': props.variant === 'secondary',
}));
 const SizeClass = computed(() => ({
    'w-full': props.size === 'default',
    'md:w-6/12 mx-auto w-full': props.size === 'lg',
  }));

</script>