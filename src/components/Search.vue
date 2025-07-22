<template>
    <section class="flex flex-col w-full space-y-2 items-center md:w-3/5 md:mx-auto ">
        <div class="flex items-center border bg-white border-gray-300 rounded-full px-3 py-2 w-full
         focus-within:border-blue-500 focus-within:ring-none focus-within:ring-none transition">
            <SearchIcon class="w-5 h-5 text-gray-500 mr-2" @click="onInput" />
            <input type="text" v-model="searchQuery" placeholder="Search..." class="w-full outline-none text-gray-700"
                @keyup.enter="onInput" />
        </div>
        <div
            class="flex flex-col space-y-4 w-4/5 *:bg-white *:rounded-xl  *:border *:px-3 *:py-1 md:flex-row md:w-fit md:items-center md:space-y-0 md:space-x-2">
            <input class="border-red-600 placeholder-red-600" placeholder="Genre (Disabled)" type="text" disabled />
            <input class="border-gray-400" placeholder="Year (Optional)" type="number" v-model="year" />
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SearchIcon from "./icons/SearchIcon.vue"
import { useMainDataStore } from '@/stores/mainStore';
const searchQuery = ref(''), dataStore = useMainDataStore(), year = ref('');
function onInput() {
    dataStore.fetchData(searchQuery.value.toLowerCase(), year.value);
}
onMounted(() => {
    if (dataStore.searchHistory) {
        searchQuery.value = dataStore.searchHistory[dataStore.searchHistory.length - 1]
        if (searchQuery.value.includes("-")) {
            year.value = searchQuery.value.slice(searchQuery.value.indexOf("-")+1);
            searchQuery.value = searchQuery.value.slice(0,searchQuery.value.indexOf("-"))
        }
    }
    console.log(dataStore.searchHistory[dataStore.searchHistory.length - 1])
})
</script>