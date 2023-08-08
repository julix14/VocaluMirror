<template>
    <div class="flex flex-col justify-center">
        <progress class="w-36 h-2" :value="health" max="100"></progress>
        <img :src="getFullUrl(avatar)" alt="characterImage" class="w-36 aspect-square mt-2" />
        <p class="text-subHeadingGray text-2xl text-center">{{ name }}</p>
    </div>
</template>

<script setup>
defineProps({
    name: {
        type: String,
        required: true,
        default: "Player",
    },
    avatar: {
        type: String,
        required: true,
        default: "../assets/avatars/avatar1.png",
    },
    health: {
        type: Number,
        required: true,
        default: 90,
    },
});

function getFullUrl(relativeUrl) {
    const baseUrl = new URL(import.meta.url);
    const fullPath = `src/client/assets/${relativeUrl}`;
    return new URL(fullPath, baseUrl.origin).href;
}
</script>
