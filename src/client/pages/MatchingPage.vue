<template>
    <div class="h-fit min-h-screen w-screen bg-rose opacity-75 pt-10">
        <div>
            <p class="text-white text-8xl text-center drop-shadow-2xl">Matching</p>
            <p class="text-subHeadingGray text-3xl text-center mt-4">
                Pick the correct word for the picture
            </p>
        </div>
        <div class="grid grid-cols-2 mx-20 p-20 gap-x-10">
            <VocaluImage src="https://loremflickr.com/1230/640" class="place-self-center" />
            <div class="w-full flex flex-col justify-between items-center" id="answerOptions">
                <MatchingButton
                    v-for="(answer, index) in answerOptions"
                    :key="answer.text"
                    :text="answer.text"
                    :selected="answer.selected"
                    :color="answer.color"
                    @click="answerSelected(index)"
                    class="my-4" />
            </div>
        </div>
        <div>&nbsp;</div>
    </div>
</template>

<script setup>
import MatchingButton from "../components/buttons/MatchingButton.vue";
import VocaluImage from "../components/vocaluImage.vue";
import { ref } from "vue";

const answerOptions = ref([
    {
        text: "Answer 1",
        selected: false,
        correct: false,
        color: "bg-white",
    },
    {
        text: "Right",
        selected: false,
        correct: true,
        color: "bg-white",
    },
    {
        text: "Wrong Answer",
        selected: false,
        correct: false,
        color: "bg-white",
    },
    {
        text: "Wrong Answer",
        selected: false,
        correct: false,
        color: "bg-white",
    },
]);

function answerSelected(index) {
    changeColors();
    answerOptions.value[index].selected = true;
    if (answerOptions.value[index].correct) {
        console.log("Correct Answer");
    } else {
        console.log("Incorrect Answer");
    }
}

function changeColors() {
    answerOptions.value.map((answer) => {
        console.log(answer);
        console.log(answer.correct);
        if (answer.correct === true) {
            answer.color = "bg-correctGreen";
        } else {
            answer.color = "bg-wrongRed";
        }
    });
}
</script>

<style scoped>
#answerOptions > :not(.bg-correctGreen):not(.selected-shadow):not(.bg-white) {
    opacity: 0.5;
}
</style>
