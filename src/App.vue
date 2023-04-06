<template>
  <div class="h-screen flex flex-col">
    <div class="px-6 py-6 mx-auto lg:flex gap-6 justify-center flex-1 w-full" style="height: calc(100vh - 50px)">
      <div class="max-w-full lg:max-w-[70%] xl:max-w-[50%] w-full" :class="{'flex-1': opened}">
        <div class="bg-gray-100 rounded-lg shadow-md h-full flex flex-col">
          <SearchInput @search="search"/>
          <ResultsList :query="query" @show="showPackage"/>
        </div>
      </div>

      <div v-if="opened"
           class="bg-gray-50 p-4 mt-6 lg:mt-0 rounded-lg shadow-md relative w-full lg:w-1/2 overflow-auto"
      >
        <Suspense>
          <template #default>
            <Description v-if="pkg" @close="opened = false" :package="pkg"/>
          </template>

          <template #fallback>
            <div>
              Loading ...
            </div>
          </template>
        </Suspense>
      </div>
    </div>

    <footer class="h-[50px] pt-2">
      <UserInfo />
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchInput from './components/SearchInput.vue';
import ResultsList from './components/ResultsList.vue';
import Description from './components/Description.vue';
import UserInfo from './components/UserInfo.vue';

const query = ref('');
const pkg = ref('');
const opened = ref(false);

function search(q) {
  query.value = q;
}

function showPackage(value) {
  pkg.value = null;
  opened.value = true;
  setTimeout(() => {
    pkg.value = value;
  }, 0);
}

</script>
