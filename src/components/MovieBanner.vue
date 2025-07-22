<template>
    <div class="mainTheme mx-2 p-4 flex flex-col items-center space-y-4 w-fit md:mx-0 md:w-full">
        <div class="justify-center flex">
            <img class="h-96 w-80 object-cover rounded-xl md:w-full" :src="props.movieData.Poster" alt="">
        </div>
        <div class="space-y-2 w-full justify-around">
            <h2 class="bg-zinc-200 p-4 rounded-xl text-center">{{ props.movieData.Title }}</h2>
            <div class="flex justify-center space-x-2 *:bg-zinc-200 *:p-2 *:rounded-lg">
                <h4>{{ props.movieData.Year }}</h4>
                <h4>{{ props.movieData.Type }}</h4>
            </div>
        </div>
        <RouterLink :to="'/Moviesdetails/'+props.movieData.imdbID" class="rounded-full bg-zinc-200 shadow-xs px-4 py-1 cursor-pointer">Learn More</RouterLink>
    </div>
</template>

<script setup>
import {RouterLink} from "vue-router";
const props = defineProps(["movieData"]);
</script>