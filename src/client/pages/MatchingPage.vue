<template>
    <div class="h-fit min-h-screen w-screen bg-rose opacity-75 pt-10 flex flex-col justify-between">
        <div>
            <p class="text-white text-8xl text-center drop-shadow-2xl">Matching</p>
            <p class="text-subHeadingGray text-3xl text-center mt-4">
                Pick the correct word for the picture
            </p>
        </div>
        <div class="grid grid-cols-2 m-auto p-20 gap-x-10 w-2/3">
            <VocaluImage :src="rawVocabulary[0].img_url" class="place-self-center" />
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
        <div class="w-2/3 mx-auto">
            <p class="text-white text-3xl text-center">Score: {{ score }}</p>
            <MatchingButton text="Next" color="bg-white" class="m-auto" />
        </div>
    </div>
</template>

<script setup>
import MatchingButton from "../components/buttons/MatchingButton.vue";
import VocaluImage from "../components/vocaluImage.vue";
import { ref } from "vue";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

const score = ref(0);

const rawVocabulary = ref(props.data);
console.log(rawVocabulary.value[0].img_url);
let wrongWords = ref(rawVocabulary.value[0].wrong_word.split(","));

const answerOptions = ref([
    {
        text: rawVocabulary.value[0].correct_word,
        selected: false,
        correct: true,
        color: "bg-white",
    },
    {
        text: wrongWords.value[0],
        selected: false,
        correct: false,
        color: "bg-white",
    },
    {
        text: wrongWords.value[1],
        selected: false,
        correct: false,
        color: "bg-white",
    },
    {
        text: wrongWords.value[2],
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
