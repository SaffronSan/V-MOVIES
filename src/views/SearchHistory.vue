<template>
    <section class="">
        <h1 class="mainTheme w-fit p-2">Total Searched:</h1>
        <ol class="flex flex-col space-y-4 my-2 p-2">
            <li class="mainTheme p-4 w-fit xl:ml-36" v-for="item in dataStore.searchHistory" :key="item">
                {{ item }}
            </li>
        </ol>
    </section>

</template>

<script setup>
import { useMainDataStore } from '@/stores/mainStore';
const dataStore = useMainDataStore();
</script>