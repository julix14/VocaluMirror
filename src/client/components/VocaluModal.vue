<template>
    <div
        class="fixed inset-0 flex items-center justify-center w-full h-full bg-slate-700 bg-opacity-40">
        <div
            class="bg-rose border-solid border-white border-8 rounded-2xl p-8 drop-shadow-lg w-1/3 h-1/3 flex flex-col justify-between">
            <div v-if="isCorrect">
                <p class="text-4xl font-black text-center drop-shadow-2xl">Congratulation! 🥳</p>
                <p class="text-2xl font-bold text-center mt-2 drop-shadow-2xl">
                    You earned +5 Points
                </p>
            </div>
            <div v-else>
                <p class="text-4xl font-black text-center drop-shadow-2xl">Sorry! 😢</p>
                <p class="text-2xl font-bold text-center mt-2 drop-shadow-2xl">You lost 5 Points</p>
            </div>
            <MatchingButton
                text="Next"
                color="bg-white"
                class="mt-4 w-full"
                @click="nextQuestion" />
        </div>
    </div>
</template>

<script setup>
import MatchingButton from "./buttons/MatchingButton.vue";

defineProps({
    isCorrect: {
        type: Boolean,
        required: true,
    },
});
const emit = defineEmits(["nextQuestion"]);

function nextQuestion() {
    emit("nextQuestion");
}
</script>
