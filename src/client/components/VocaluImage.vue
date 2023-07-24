<template>
    <img
        :src="src"
        class="rounded-2xl drop-shadow-lg object-contain border-collapse border-solid border-white border-8" />
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
