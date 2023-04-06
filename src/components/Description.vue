<template>
  <div>
    <button class="absolute right-0 top-0 p-2" @click.prevent="close">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <ResultItem :pack="props.package" />

    <FilesList :files="files" @list="listDirectory"  />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import ResultItem from './ResultItem.vue';
import FilesList from './FilesList.vue';

const props = defineProps({
  package: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

const searchParams = `${props.package.name}@${props.package.version}`;
const response = await axios.get(`https://data.jsdelivr.com/v1/packages/npm/${searchParams}`);

const files = ref(response.data.files);

function close() {
  emit('close');
}

function listDirectory(item) {
  let backName = '';

  if (files.value[0].type === 'back') {
    backName += files.value[0].name;
  }

  files.value = [
    ...item.files,
  ];

  if (item.back) {
    files.value.unshift({
      type: 'back',
      name: `${backName}/${item.back.name}`,
      back: item.back.files,
    });
  }
}
</script>
