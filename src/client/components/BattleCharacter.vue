<template>
    <div class="flex flex-col justify-center w-36 h-36 drop-shadow-2xl">
        <div class="w-full bg-gray-200 rounded-xl">
            <div
                class="text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-2xl"
                :class="{
                    'bg-red-700': health < 30,
                    'bg-orange': health >= 30 && health <= 60,
                    'bg-green-700': health > 60,
                }"
                :style="{ width: health + '%' }">
                {{ health }}
            </div>
        </div>
        <img :src="getFullUrl(avatar)" alt="characterImage" class="aspect-square mt-2" />
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
        default: 31,
    },
});

function getFullUrl(relativeUrl) {
    const baseUrl = new URL(import.meta.url);
    const fullPath = `src/client/assets/${relativeUrl}`;
    return new URL(fullPath, baseUrl.origin).href;
}
</script>

<style scoped></style>
