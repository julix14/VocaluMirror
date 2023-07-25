<template>
    <router-link to="/">
        <div
            class="fixed top-10 left-6 p-4 z-50 bg-white rounded-2xl flex justify-center items-center shadow cursor-pointer">
            <p class="text-3xl font-bold pt-1">Home</p>
            <img
                :src="getFullUrl('home-icon.png')"
                alt="home-icon"
                class="text-gray-600 h-10 w-10 ml-4" />
        </div>
    </router-link>
</template>

<script setup>
function getFullUrl(relativeUrl) {
    const baseUrl = new URL(import.meta.url);
    const fullPath = `src/client/assets/${relativeUrl}`;
    return new URL(fullPath, baseUrl.origin).href;
}
</script>
