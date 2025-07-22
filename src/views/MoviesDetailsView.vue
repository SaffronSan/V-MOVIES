<template>
    <section class="mx-3  md:items-center md:mx-auto">
        <SkeletonDetails v-if="dataStore.fetching" />
        <section class="space-y-4" v-if="data">
            <div class="mainTheme flex flex-col space-y-2 md:w-4/5 md:mx-auto">
                <div class="flex p-2 justify-center space-x-2 items-end md:justify-start">
                    <img class="h-96 rounded-xl" :src="data.Poster" alt="" />
                    <h6 class="bg-zinc-200 py-1 rounded px-2 size-fit">{{ data.details.Rated }}</h6>
                </div>
                <h1 class="text-center bg-zinc-200 w-fit mx-auto py-1 rounded px-2 text-xl md:mx-0 md:ml-2">
                    {{ data.Title }}
                </h1>
                <div class="flex justify-around *:bg-zinc-200 *:rounded *:px-2 p-2 md:justify-start md:space-x-2">
                    <h5>{{ data.details.Year }}</h5>
                    <h5>{{ data.details.Genre }}</h5>
                    <h5>{{ data.details.Runtime }}</h5>
                </div>
            </div>
            <div class="mainTheme p-2 text-center  md:w-3/5 md:mx-auto">
                <p>{{ data.details.Awards }}</p>
            </div>
            <div class="mainTheme p-4 flex flex-col items-center justify-around  md:w-3/5 md:mx-auto">
                <h5>
                    <span>Ratings:</span>
                    <span class="">
                        {{ data.details.imdbRating }}
                    </span>
                </h5>
                <h5 class="text-yellow-600 text-lg">{{ data.details.BoxOffice? chopMoney(data.details.BoxOffice) : "N/A" }}</h5>
                <h5>{{ data.details.Country }}</h5>
            </div>
            <article class="mainTheme p-2 space-y-2 md:p-5  md:w-4/5 md:mx-auto">
                <h2>Plot:</h2>
                <p>
                    {{ data.details.Plot }}
                </p>
            </article>
            <section class="space-y-4 md:w-3/5 md:mx-auto">
                <h2 class="mainTheme w-fit p-2">Peoples:</h2>
                <section class="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                    <Person v-for="item in data.details.Director" :name="item" title="Director" :key="item" />
                    <Person v-for="item in data.details.Writer" :name="item" title="Writer" :key="item" />
                    <Person v-for="item in data.details.Actors" :name="item" title="Actors" :key="item" />
                </section>
            </section>
        </section>

    </section>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useMainDataStore } from '@/stores/mainStore';
import { useRoute } from 'vue-router'
import { chopMoney } from "../static/handleBasic.js"
import SkeletonDetails from "@/components/SkeletonDetails.vue"
import Person from "@/components/Person.vue"
const route = useRoute(),
    dataStore = useMainDataStore(),
    imdbID = route.params.id,
    data = ref(null);
// Before this, you need to fetch the detailed version and append it to the current Data
onMounted(() => {
    if (dataStore.mainData.length === 0) {
        dataStore.setUp();
    }
    data.value = dataStore.getMovieById(imdbID);
    dataStore.setDetails(imdbID);
    console.log(dataStore.fetching)
})
</script>