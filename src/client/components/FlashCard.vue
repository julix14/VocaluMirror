<template>
    <div class="bg-white rounded-3xl w-1/2 h-1/2 mt-5 p-2 drop-shadow-2xl">
        <div class="h-full flex flex-col justify-between">
            <div class="grid grid-cols-3 justify-items-center p-2">
                <p class="text-xl">{{ flashCard.topic }}</p>
                <p class="text-xl col-start-3">Stage {{ flashCard.stage }}</p>
            </div>
            <p class="text-3xl p-2 text-center">{{ flashCard.question }}</p>
            <div>&nbsp;</div>
        </div>
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
