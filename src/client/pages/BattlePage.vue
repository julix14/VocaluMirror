<template>
    <div class="bg-yellow bg-opacity-60 w-screen h-fit min-h-screen flex flex-col overflow-hidden">
        <div>
            <HomeButton />
            <p class="text-white text-8xl xl:text-9xl text-center mt-10 drop-shadow-2xl">
                Word Battle
            </p>
            <p class="text-subHeadingGray text-3xl xl:text-4xl text-center font-bold mt-4">
                Find the fitting translation and beat the computer!
            </p>
        </div>
        <div class="grid grid-cols-4 grid-rows-3 h-full mt-8 justify-items-center gap-4">
            <BattleCharacter
                class="row-start-3"
                avatar="avatars/avatar1.png"
                :name="props.user?.name ?? 'You'"
                :health="userHealth" />
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
                :health="computerHealth" />
        </div>
        <div
            v-if="timer"
            class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white p-8 rounded-lg">
                <p v-if="correctGuess" class="text-2xl text-center">
                    <span class="font-bold text-3xl">You won! 🥳</span> <br />
                    Next round in...
                </p>
                <p v-else class="text-2xl text-center">
                    <span class="font-bold text-3xl">You lost! 😢</span> <br />
                    Next round in...
                </p>
                <p class="text-6xl text-center mt-4">{{ timer }}</p>
            </div>
        </div>

        <div>
            <VocaluModal
                v-if="gameFinished"
                :isPositve="userHealth > 0"
                @next="nextRound"
                positiveMessage="You won the game! 🥳"
                negativeMessage="You lost the game! 😢"
                color="bg-yellow"
                nextButtonMessage="Next round" />
        </div>
    </div>
</template>

<script setup>
import BattleCharacter from "../components/BattleCharacter.vue";
import HomeButton from "../components/buttons/HomeButton.vue";
import MatchingButton from "../components/buttons/MatchingButton.vue";
import { ref, watch } from "vue";
import axios from "axios";
import VocaluModal from "../components/VocaluModal.vue";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    user: {
        type: Object,
        required: false,
    },
});

const userHealth = ref(100);
const computerHealth = ref(100);

const gameFinished = ref(false);

watch([userHealth, computerHealth], ([userHealthValue, computerHealthValue]) => {
    if (userHealthValue <= 0 || computerHealthValue <= 0) {
        gameFinished.value = true;
    }
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

    temporaryWords = await loadNewWords();
    if (userHealth.value <= 0 || computerHealth.value <= 0) {
        return;
    }

    // Start the timer
    timer.value = 3;
    const intervalId = setInterval(() => {
        timer.value--;
        if (timer.value === 0 || timer.value === null) {
            clearInterval(intervalId);
            optionSelected.value = false;
            timer.value = null;
            nextQuestion();
        }
    }, 1000);
}

function selectedIsCorrect() {
    correctGuess.value = true;
    computerHealth.value -= 10;

    if (userHealth.value < 99) {
        userHealth.value += 2;
    }
}

function selectedIsWrong() {
    correctGuess.value = false;
    userHealth.value -= 10;
}

async function loadNewWords() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/quizwords`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

function nextQuestion() {
    optionSelected.value = false;
    correctGuess.value = false;

    answerOptions.value = rawVocabularyToAnswers(temporaryWords);
}

function nextRound() {
    gameFinished.value = false;
    userHealth.value = 100;
    computerHealth.value = 100;
    nextQuestion();
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

const timer = ref(null);
</script>

<style scoped>
#answerOptions > :not(.bg-correctGreen):not(.selected-shadow):not(.bg-white) {
    opacity: 0.5;
}
</style>
