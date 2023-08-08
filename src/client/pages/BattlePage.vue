<template>
    <div class="bg-yellow bg-opacity-60 w-screen h-fit min-h-screen flex flex-col overflow-hidden">
        <div>
            <HomeButton />
            <p class="text-white text-8xl xl:text-9xl text-center mt-10 drop-shadow-2xl">
                Word Battle
            </p>
            <p class="text-subHeadingGray text-3xl xl:text-4xl text-center font-bold mt-4">
                Who know more vocabulary words?
            </p>
        </div>
        <div class="grid grid-cols-4 grid-rows-3 h-full mt-8 justify-items-center gap-4">
            <BattleCharacter
                class="row-start-3"
                avatar="avatars/avatar1.png"
                name="Player"
                health="31" />
            <MatchingButton
                class="col-start-2 row-start-1 col-span-2 cursor-default"
                color="bg-white"
                :text="correctMeaning" />
            <MatchingButton
                v-for="(answer, index) in answerOptions"
                :key="answer.text"
                :text="answer.text"
                :selected="answer.selected"
                :color="answer.color"
                @click="answerSelected(index)"
                :class="getPositioningClasses(index)" />

            <BattleCharacter
                class="col-start-4 row-start-1"
                avatar="avatars/avatar2.png"
                name="Computer"
                health="90" />
        </div>
    </div>
</template>

<script setup>
import BattleCharacter from "../components/BattleCharacter.vue";
import HomeButton from "../components/buttons/HomeButton.vue";
import MatchingButton from "../components/buttons/MatchingButton.vue";
import { ref } from "vue";
import axios from "axios";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

function getPositioningClasses(index) {
    let classesToReturn = "";

    if (index < 2) {
        classesToReturn += "row-start-2";
    } else {
        classesToReturn += "row-start-3";
    }
    classesToReturn += " ";

    if (index % 2 === 0) {
        classesToReturn += "col-start-2";
    } else {
        classesToReturn += "col-start-3";
    }

    return classesToReturn;
}

const rawVocabulary = ref(props.data);
const correctMeaning = ref(null);

const answerOptions = ref(rawVocabularyToAnswers(rawVocabulary.value));

function rawVocabularyToAnswers(data) {
    const wrongWords = data.wrong_word.split(",");
    const answers = [
        {
            text: data.correct_word,
            selected: false,
            correct: true,
            color: "bg-white",
        },
        {
            text: wrongWords[0],
            selected: false,
            correct: false,
            color: "bg-white",
        },
        {
            text: wrongWords[1],
            selected: false,
            correct: false,
            color: "bg-white",
        },
        {
            text: wrongWords[2],
            selected: false,
            correct: false,
            color: "bg-white",
        },
    ];
    correctMeaning.value = data.correct_meaning;

    return shuffle(answers);
}

// Shuffle the answers to randomize the order
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}
const optionSelected = ref(false);

// Check if the selected option is correct and show it in the Modal
const correctGuess = ref(false);

let temporaryWords;
// Get called when an option is selected
async function answerSelected(index) {
    // Change the colors to green and red
    changeColors();

    // Set the option selected to true to show the modal
    optionSelected.value = true;

    // Set the selected option to true to style button liked pressed
    answerOptions.value[index].selected = true;

    if (answerOptions.value[index].correct) {
        // Show the Modal with the correct styling
        selectedIsCorrect();
    } else {
        selectedIsWrong();
    }

    // Load the new words to reduce waiting time
    temporaryWords = await loadNewWords();
}

function selectedIsCorrect() {
    correctGuess.value = true;
}

function selectedIsWrong() {
    correctGuess.value = false;
}

// Reset the options and load new words
async function loadNewWords() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/quizwords`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Change the colors of the options in the array
function changeColors() {
    answerOptions.value.map((answer) => {
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
