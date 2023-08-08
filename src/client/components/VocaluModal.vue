<template>
    <div
        class="fixed inset-0 flex items-center justify-center w-full h-full bg-slate-700 bg-opacity-40">
        <div
            class="border-solid border-white border-8 rounded-2xl p-8 drop-shadow-lg w-1/3 h-1/3 flex flex-col justify-between"
            :class="color">
            <div v-if="isPositve">
                <p class="text-4xl font-black text-center drop-shadow-2xl">Congratulation! 🥳</p>
                <p class="text-2xl font-bold text-center mt-2 drop-shadow-2xl">
                    {{ positiveMessage }}
                </p>
            </div>
            <div v-else>
                <p class="text-4xl font-black text-center drop-shadow-2xl">Sorry! 😢</p>
                <p class="text-2xl font-bold text-center mt-2 drop-shadow-2xl">
                    {{ negativeMessage }}
                </p>
            </div>
            <p class="text-2xl font-bold text-center mt-2 drop-shadow-2xl">{{ generalMessage }}</p>
            <MatchingButton
                :text="nextButtonMessage"
                color="bg-white"
                class="mt-4 w-full"
                @click="next" />
        </div>
    </div>
</template>

<script setup>
import MatchingButton from "./buttons/MatchingButton.vue";

defineProps({
    isPositve: {
        type: Boolean,
        required: true,
    },
    positiveMessage: {
        type: String,
        required: false,
    },
    negativeMessage: {
        type: String,
        required: false,
    },
    generalMessage: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: true,
    },
    nextButtonMessage: {
        type: String,
        required: false,
        default: "Next",
    },
});
const emit = defineEmits(["nextQuestion"]);

function next() {
    emit("next");
}
</script>
