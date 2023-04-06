<template>
    <div>
        <div class="font-bold text-lg pt-2">
            <span>{{ pack.name }}</span>
            <span v-if="exact" class="bg-indigo-200 text-gray-700 rounded text-sm font-normal px-1 py-1 relative -top-2 left-2">exact match</span>
        </div>
        <div class="text-gray-500 mt-2">{{ pack.description }}</div>

        <ul v-if="pack.keywords" class="mt-4 flex flex-wrap gap-3 whitespace-nowrap">
            <li v-for="keyword in pack.keywords"
                :key="keyword"
                class="bg-gray-100 text-sm px-2 py-1 rounded shadow border-1 border-gray-400"
            >{{ keyword }}</li>
        </ul>

        <div class="mt-4 border-t-2 border-dotted border-gray-400 flex justify-between pt-2">
            <span class="text-sm">published by: <b class="font-bold">{{ pack.publisher.username }}</b> ({{ date }})</span>
            <span class="ml-3 text-gray-800 italic text-sm">version: {{ pack.version }}</span>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment';
import { computed } from 'vue';

const props = defineProps({
  pack: {
    type: Object,
    required: true,
  },
  exact: {
    type: Boolean,
    default: false,
  },
});

const date = computed(() => moment(props.pack.date).format('DD-MM-YYYY'));
</script>
