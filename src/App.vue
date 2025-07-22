<template>
  <nav class = "mainTheme space-x-4 p-2 w-fit *:bg-zinc-200 *:px-2 *:py-1 *:rounded m-2 mx-auto z-1">
    <RouterLink to="/" activeClass="text-green-600">Home</RouterLink>
     <RouterLink to="/History" activeClass="text-green-600">History</RouterLink>
  </nav>
  <main class="grow-1 mx-2">
    <RouterView />
  </main>
  <footer class="flex items-center justify-around mainTheme p-2 m-2 md:w-2/5 md:mx-auto z-1 ">
    <h6>&copy; Anish Thapa</h6>
    <div>
      <h4>Socials</h4>
      <div class="flex space-x-2">
        <a href="">
          <LinkedinIcon />
        </a>
        <a href="">
          <GithubIcon />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useMainDataStore } from '@/stores/mainStore';
import { ref, onMounted } from 'vue'
import LinkedinIcon from "@/components/icons/LinkedinIcon.vue"
import GithubIcon from "@/components/icons/GithubIcon.vue"
const data = useMainDataStore();
onMounted(()=>{
  data.setUp();
})
</script>
