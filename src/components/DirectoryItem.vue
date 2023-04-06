<template>
  <div class="flex align-center">
    <FolderIcon class="w-5 h-5 text-orange-500"/>

    <span class="ml-1 cursor-pointer hover:underline">{{ data.name }}</span>
  </div>
</template>

<script setup>
import {FolderIcon} from '@heroicons/vue/20/solid';

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
