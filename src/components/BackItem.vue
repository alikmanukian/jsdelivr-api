<template>
  <div class="flex align-center cursor-pointer mb-4">
    <ArrowUturnLeftIcon class="text-gray-400 w-5 h-5"/>

    <span class="ml-2 tracking-wide leading-5">{{ data.name }}/...</span>
  </div>
</template>

<script setup>
import {ArrowUturnLeftIcon} from '@heroicons/vue/20/solid';

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
