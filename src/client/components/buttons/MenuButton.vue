<template>
    <router-link :to="route" class="menu-button">
    <div
        class="bg-white flex flex-col w-72 h-72 rounded-2xl text-center hover:h-80 ease-in duration-200 delay-75 cursor-pointer drop-shadow-lg"
        @mouseenter="textVisible = true"
        @mouseleave="textVisible = false">
        <img :src="getFullUrl(imgPath)" class="p-10 z-20" />

        <span
            class="text-5xl font-bold duration-300 ease-in-out delay-75"
            :class="[textVisible ? '-mt-6 opacity-100' : '-mt-20 opacity-0 -z-10']"
            >{{ title }}</span
        >
    </div>
    </router-link>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, RouterLink } from "vue-router";

defineProps({
    imgPath: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

const textVisible = ref(false);

const route = useRoute();

function getFullUrl(relativeUrl) {
    const baseUrl = new URL(import.meta.url);
    const fullPath = `src/client/assets/${relativeUrl}`;
    return new URL(fullPath, baseUrl.origin).href;
}
</script>
