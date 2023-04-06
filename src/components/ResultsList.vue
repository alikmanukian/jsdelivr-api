<template>
  <div class="p-4 mb-4 relative flex-1 overflow-auto">
    <div v-if="error" class="text-red-500">Error: {{ error }}</div>
    <template v-else>
      <div v-if="packages.length === 0 && !loading"
           class="mt-12 text-center p-6 text-3xl font-bold text-gray-600 flex flex-col items-center space-y-6"
      >
        <BoltIcon class="w-20 h-20" />
        <span>No packages found</span>
      </div>

      <div v-if="packages.length === 0 && loading"
            class="absolute inset-0 bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-600 rounded-xl">
            Loading...
      </div>

      <div v-if="packages.length > 0">
        <div class="mb-6 text-gray-500">
          <span class="font-bold">{{ total }}</span> packages found
        </div>

        <Pagination :currentPage="currentPage"
                    :totalPages="pages"
                    :maxPages="5"
                    @change="changePage"
                    v-if="pages > 1"
                    class="mb-8" />

        <div class="relative">
          <ul class="space-y-4">
            <li v-for="pkg in packages"
                :key="pkg.package.name"
                @click="show(pkg.package)"
                class="rounded-xl bg-gray-50 p-4 shadow hover:bg-violet-50 hover:shadow-lg cursor-pointer transition">
                <ResultItem :pack="pkg.package" :exact="pkg.package.name === query"/>
              </li>
          </ul>

          <div v-if="loading"
            class="absolute inset-0 bg-white flex justify-center text-3xl font-bold text-gray-600 rounded-xl bg-opacity-80 pt-[50px]">
            Loading...
          </div>
        </div>

        <Pagination :currentPage="currentPage"
                    :totalPages="pages"
                    :maxPages="5"
                    @change="changePage"
                    v-if="pages > 1"
                    class="mt-8" />
      </div>
    </template>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { BoltIcon } from '@heroicons/vue/20/solid';
import Pagination from './Pagination.vue';
import ResultItem from './ResultItem.vue';

const props = defineProps({
  query: {
    type: String,
    required: true,
  },
});

const packages = ref([]);
const loading = ref(false);
const error = ref(null);
const pages = ref(0);
const currentPage = ref(1);
const total = ref(0);

const PAGE_SIZE = 10;

const emit = defineEmits(['show']);

function search() {
  loading.value = true;
  error.value = null;

  const searchParams = `text=${props.query}&size=${PAGE_SIZE}&from=${(currentPage.value - 1) * PAGE_SIZE}`;

  axios.get(`https://registry.npmjs.org/-/v1/search?${searchParams}`)
    .then((response) => {
      packages.value = response.data.objects;
      total.value = response.data.total;
      pages.value = Math.ceil(response.data.total / PAGE_SIZE);
      loading.value = false;
    })
    .catch((e) => {
      error.value = e.message;
      pages.value = 0;
      total.value = 0;
      loading.value = false;
    });
}

function show(pkg) {
  emit('show', pkg);
}

function changePage(value) {
  currentPage.value = value;
  search();
}

watch(() => props.query, () => {
  currentPage.value = 1;
  search();
});
</script>
