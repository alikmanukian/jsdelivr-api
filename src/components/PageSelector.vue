<template>
  <component :is="page === '...' ? 'span' : 'a'" href="#" @click.prevent="changePage"
    class="inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium"
    :class="{
      'border-indigo-500 text-indigo-600': currentPage == page,
      'border-transparent text-gray-500': currentPage != page,
      'hover:border-gray-300 hover:text-gray-700': currentPage != page && page !== '...'
    }">{{ page }}</component>
</template>

<script setup>
const props = defineProps({
  page: {
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['change']);

function changePage() {
  if (props.page === '...') {
    return;
  }
  emit('change', props.page);
}

// const className = computed(() => {

// });
</script>
