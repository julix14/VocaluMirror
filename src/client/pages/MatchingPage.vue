<template>
    <div
        class="h-fit min-h-screen w-screen bg-rose opacity-75 pt-10 flex flex-col justify-between overflow-hidden">
        <HomeButton />
        <div>
            <p class="text-white text-8xl text-center drop-shadow-2xl">Matching</p>
            <p class="text-subHeadingGray text-3xl text-center mt-4">
                Pick the correct word for the picture
            </p>
        </div>
        <div class="grid grid-cols-2 m-auto p-20 gap-x-12 w-2/3">
            <VocaluImage :src="correctWordImage" class="place-self-center" />
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
        <Transition name="fade">
            <VocaluModal
                v-show="optionSelected"
                :isCorrect="correctGuess"
                @nextQuestion="nextQuestion" />
        </Transition>
        <div class="w-2/3 mx-auto px-32 mb-4">
            <p class="text-white text-4xl text-center">Score: {{ score }}</p>
        </div>
    </div>
</template>

<script setup>
import MatchingButton from "../components/buttons/MatchingButton.vue";
import VocaluImage from "../components/VocaluMatchingImage.vue";
import VocaluModal from "../components/VocaluModal.vue";
import HomeButton from "../components/buttons/HomeButton.vue";
import { onMounted, ref } from "vue";
import axios from "axios";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

// Score
onMounted(() => {
    loadScore();
});

const score = ref(0);

function loadScore() {
    axios.get(`user/${import.meta.env.VITE_APP_USER_ID}/score`).then((res) => {
        score.value = res.data.matching_score;
    });
}

function updateScore() {
    axios
        .put(`user/${import.meta.env.VITE_APP_USER_ID}/score`, {
            matchingScore: score.value,
        })
        .catch((err) => console.log(err));
}

// Vocabulary & Answer Options
// Vocabulary transfered from vue router
const rawVocabulary = ref(props.data);

// Img default set to the first word set
const correctWordImage = ref(rawVocabulary.value.img_url);

// Answers set to the first word set
const answerOptions = ref(rawVocabularyToAnswers(rawVocabulary.value));

// Convert the raw data from the database to the answer options
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

    correctWordImage.value = data.img_url;
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

// Modal
// Check if an option is selected to show the modal
const optionSelected = ref(false);

// Check if the selected option is correct and show it in the Modal
const correctGuess = ref(false);

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
    score.value += 5;
    updateScore();
    correctGuess.value = true;
}

function selectedIsWrong() {
    score.value -= 5;
    updateScore();
    correctGuess.value = false;
}

// Reset the options and load new words
async function loadNewWords() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/matchingwords`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Gets called when the next button in the modal is pressed
function nextQuestion() {
    // Reset the styling of the options and the modal
    optionSelected.value = false;
    correctGuess.value = false;

    // Set the new words to the answer options and display them
    answerOptions.value = rawVocabularyToAnswers(temporaryWords);
}
</script>

<style scoped>
#answerOptions > :not(.bg-correctGreen):not(.selected-shadow):not(.bg-white) {
    opacity: 0.5;
}
</style>
