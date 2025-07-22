<template>
    <div class="relative mainTheme p-3 w-64 mx-auto">
        <PersonIcon class="w-full text-[12rem] xl:text-[8rem]"/>
        <div class="z-0 *:p-2 *:inline text-center space-y-1">
            <h3>
                {{ props.name }}
                <span class="text-sm">
                    {{ " - " + props.title }}
                </span>
            </h3>
        </div>
    </div>
</template>

<script setup>
    // <Person v-for="item in data.details.Director" :mainData = "item.Name" title="Director"/>
    import PersonIcon from "./icons/PersonIcon.vue"
    const props = defineProps(["name","title"]);
    console.log(props.mainData)
</script>