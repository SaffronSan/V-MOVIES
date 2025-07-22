<template>
  <section class="mx-2 space-y-2">
    <div>
      <Search />
    </div>
    <div v-if="!data.fetching" class="grid grid-cols-1 gap-2 items-center justify-items-center md:grid-cols-2 xl:grid-cols-3 md:gap-4 md:mx-8">
      <MovieBanner :movieData="item" v-for="item in data.mainData" :key="item.imbdID" />
    </div>
    <div v-if="data.fetching">
      <p>Searching Movies ...</p>
    </div>
    <div v-if="data.mainData.length === 0">
      <p>Empty List</p>
    </div>
  </section>
</template>


<script setup>
import Search from "@/components/Search.vue"
import MovieBanner from '@/components/MovieBanner.vue';
import { ref, onMounted } from 'vue'
import { useMainDataStore } from '@/stores/mainStore';
const data = useMainDataStore();
</script>
