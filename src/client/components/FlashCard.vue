<template>
    <Transition
        enter-from-class="rotate-y-90"
        enter-to-class="rotate-y-0"
        enter-active-class="transition-transform duration-500 "
        leave-from-class="rotate-y-0"
        leave-to-class="rotate-y-90 hidden"
        leave-active-class="transition-transform duration-500 ">
        <div v-if="!showBackside" class="bg-white rounded-3xl w-1/2 h-1/2 mt-5 p-6 drop-shadow-2xl">
            <div class="h-full flex flex-col justify-between">
                <div class="grid grid-cols-3 p-2">
                    <p class="text-xl justify-self-start">{{ flashCard.topic }}</p>
                    <p class="text-xl col-start-3 justify-self-end">
                        Stage {{ flashCard.stage }} / 5
                    </p>
                </div>
                <p class="text-3xl p-2 text-center">{{ flashCard.question }}</p>
                <div class="flex justify-end cursor-pointer" @click="showBackside = true">
                    <div
                        class="flex h-12 w-32 bg-lightBlue bg-opacity-75 p-2 items-center justify-between rounded-xl drop-shadow-lg">
                        <p>Solution</p>
                        <img
                            src="src/client/assets/flashcards/turnaround-img.png"
                            class="max-h-full" />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
    <Transition
        enter-from-class="rotate-y-90"
        enter-to-class="rotate-y-0"
        enter-active-class="transition-transform duration-500 "
        leave-from-class="rotate-y-0"
        leave-to-class="rotate-y-90"
        leave-active-class="transition-transform duration-500 hidden">
        <div v-if="showBackside" class="bg-white rounded-3xl w-1/2 h-1/2 mt-5 p-6 drop-shadow-2xl">
            <div class="h-full flex flex-col justify-between">
                <div class="grid grid-cols-3 p-2">
                    <p class="text-xl justify-self-start">Rückseite</p>
                    <p class="text-xl col-start-3 justify-self-end">
                        Stage {{ flashCard.stage }} / 5
                    </p>
                </div>
                <p class="text-3xl p-2 text-center">{{ flashCard.answer }}</p>
                <div class="flex justify-end" @click="showBackside = false">
                    <div
                        class="flex h-12 w-32 bg-lightBlue bg-opacity-75 p-2 items-center justify-between rounded-xl drop-shadow-lg">
                        <p>Solution</p>
                        <img
                            src="src/client/assets/flashcards/turnaround-img.png"
                            class="max-h-full" />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
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

<style scoped>
.flip-card {
    background-color: transparent;
    width: 300px;
    height: 200px;
    border: 1px solid #f1f1f1;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
    background-color: #bbb;
    color: black;
}

/* Style the back side */
.flip-card-back {
    background-color: dodgerblue;
    color: white;
    transform: rotateY(180deg);
}
</style>
