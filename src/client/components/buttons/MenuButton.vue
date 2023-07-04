<template>
    <div
        class="bg-white flex flex-col w-80 h-80 rounded-2xl text-center hover:h-96 ease-in duration-200 delay-75 cursor-pointer drop-shadow-lg"
        @mouseenter="textVisible = true"
        @mouseleave="textVisible = false">
        <img :src="getFullUrl(imgPath)" class="p-10 z-20" />

        <span
            class="text-5xl font-bold duration-300 ease-in-out delay-75"
            :class="[
                textVisible ? 'mt-0 opacity-100' : '-mt-20 opacity-0 -z-10',
            ]"
            >{{ title }}</span
        >
    </div>
</template>

<script setup>
import { ref } from "vue";
defineProps({
    imgPath: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    route: {
        type: String,
        required: false,
    },
});

const textVisible = ref(false);

function getFullUrl(relativeUrl) {
    const baseUrl = new URL(import.meta.url);
    const fullPath = `src/client/assets/${relativeUrl}`;
    return new URL(fullPath, baseUrl.origin).href;
}
</script>
