<template>
  <div class="p-4">
    <div class="relative overflow-hidden rounded-lg bg-white shadow-md">
      <input
        class="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
        placeholder="Find npm package ..."
        type="text"
        v-model="query" />
      <MagnifyingGlassIcon class="pointer-events-none absolute right-4 top-4 h-6 w-6 fill-slate-400" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { debounce } from 'lodash';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';

const emit = defineEmits(['search']);
const query = ref();

watch(query, debounce(() => {
  emit('search', query.value);
}, 300));
</script>
