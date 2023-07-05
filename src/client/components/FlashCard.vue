<template>
    <div class="bg-white rounded-3xl w-1/2 h-1/2 mt-5 p-2 flex flex-col drop-shadow-2xl">
        <p class="text-xl">{{ flashCard.topic }}</p>
        <p class="text-2xl text-center">{{ flashCard.question }}</p>
    </div>
</template>

<script setup>
defineProps({
    flashCard: {
        type: Object,
        required: true,
    },
});
</script>
