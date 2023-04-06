<template>
  <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    <div class="-mt-px flex w-0 flex-1">
      <a href="#"
        @click="goToPage(currentPage - 1)"
        class="disabled inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
        <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" />
        Previous
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <PageSelector :page="page"
            :currentPage="currentPage"
            :key="page"
            @change="goToPage(page)"
            v-for="page in pages" />
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <a href="#"
        @click="goToPage(currentPage + 1)"
        class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
        Next
        <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" />
      </a>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';
import PageSelector from './PageSelector.vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  maxPages: {
    type: Number,
    required: true,
    default: 8,
  },
});

const emit = defineEmits(['change']);

const pages = computed(() => {
  const links = [];
  const { currentPage, totalPages, maxPages } = props;
  const half = Math.floor(maxPages / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + maxPages - 1);

  if (end - start < maxPages - 1) {
    const delta = maxPages - (end - start + 1);
    start = Math.max(1, start - delta);
  }

  for (let i = start; i <= end; i++) {
    links.push(i);
  }

  if (start > 1) {
    links.unshift('...');
    links.unshift(1);
  }

  if (end < totalPages) {
    links.push('...');
    links.push(totalPages);
  }

  return links;
});

function goToPage(page) {
  if (page >= 1 && page <= props.totalPages) {
    emit('change', page);
  }
}

</script>
