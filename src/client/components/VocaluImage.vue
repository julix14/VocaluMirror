<template>
    <img
        :src="src"
        class="rounded-2xl drop-shadow-lg border-solid border-white border-8 aspect-square w-full h-full" />
</template>

<script setup>
defineProps({
    src: {
        type: String,
        required: true,
        default: "https://loremflickr.com/640/640",
    },
});
</script>
