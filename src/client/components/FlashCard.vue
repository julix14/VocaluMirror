<template>
    <div v-if="!showBackside" class="bg-white rounded-3xl w-1/2 h-1/2 mt-5 p-6 drop-shadow-2xl">
        <div class="h-full flex flex-col justify-between">
            <div class="grid grid-cols-3 p-2">
                <p class="text-xl justify-self-start">{{ flashCard.topic }}</p>
                <p class="text-xl col-start-3 justify-self-end">Stage {{ flashCard.stage }} / 5</p>
            </div>
            <p class="text-3xl p-2 text-center">{{ flashCard.question }}</p>
            <div class="flex justify-end cursor-pointer" @click="showBackside = true">
                <div
                    class="flex h-12 w-32 bg-lightBlue bg-opacity-75 p-2 items-center justify-between rounded-xl drop-shadow-lg">
                    <p>Solution</p>
                    <img src="src/client/assets/flashcards/turnaround-img.png" class="max-h-full" />
                </div>
            </div>
        </div>
    </div>
    <div v-if="showBackside" class="bg-white rounded-3xl w-1/2 h-1/2 mt-5 p-6 drop-shadow-2xl">
        <div class="h-full flex flex-col justify-between">
            <div class="grid grid-cols-3 p-2">
                <p class="text-xl justify-self-start">Rückseite</p>
                <p class="text-xl col-start-3 justify-self-end">Stage {{ flashCard.stage }} / 5</p>
            </div>
            <p class="text-3xl p-2 text-center">{{ flashCard.answer }}</p>
            <div class="flex justify-end" @click="showBackside = false">
                <div
                    class="flex h-12 w-32 bg-lightBlue bg-opacity-75 p-2 items-center justify-between rounded-xl drop-shadow-lg">
                    <p>Solution</p>
                    <img src="src/client/assets/flashcards/turnaround-img.png" class="max-h-full" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
    flashCard: {
        type: Object,
        required: true,
    },
});

const showBackside = ref(false);
</script>

<style scoped></style>
