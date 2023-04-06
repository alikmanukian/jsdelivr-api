<template>
  <div class="flex align-center justify-between">
    <div class="flex align-center">
      <DocumentTextIcon class="h5 w-5 text-gray-400"/>

      <span class="ml-1">{{ data.name }}</span>
    </div>

    <span>{{ size(data.size) }}</span>
  </div>
</template>

<script setup>
import {DocumentTextIcon} from '@heroicons/vue/20/solid';

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

function size(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`;
  return `${(bytes / 1073741824).toFixed(1)} GB`;
}
</script>
