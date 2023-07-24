<template>
    <div
        class="bg-lightBlue bg-opacity-75 w-screen h-fit min-h-screen flex flex-col justify-start items-center">
        <div>
            <p class="text-white text-9xl text-center mt-10 drop-shadow-2xl">Flash Cards</p>
            <p class="text-white text-4xl text-center font-bold mt-4">
                Train you with your flash cards
            </p>
        </div>
        <FlashCard :flash-card="flashCards[0]" />
    </div>
</template>

<script setup>
import FlashCard from "../components/FlashCard.vue";

const flashCards = [
    {
        topic: "Vocabulary",
        question: "What is the meaning of the word 'abundance'?",
        answer: "A large quantity or more than enough",
        stage: 1,
    },
    {
        topic: "Grammar",
        question: "What is the past tense of the verb 'run'?",
        answer: "ran",
        stage: 1,
    },
    {
        topic: "Reading Comprehension",
        question: "What is the main idea of the passage?",
        answer: "The benefits of regular exercise for overall health",
        stage: 1,
    },
    {
        topic: "Idioms",
        question: "What does the idiom 'raining cats and dogs' mean?",
        answer: "It's raining heavily",
        stage: 1,
    },
    {
        topic: "Pronunciation",
        question: "How do you pronounce the word 'pronunciation'?",
        answer: "pruh-nuhn-see-ey-shuhn",
        stage: 1,
    },
    {
        topic: "Writing",
        question: "What is the correct way to format a formal letter?",
        answer: "Start with your address, followed by the date, recipient's address, salutation, body paragraphs, closing, and signature",
        stage: 1,
    },
    {
        topic: "Listening",
        question: "Listen to the audio and identify the missing word: 'The ____ is blue.'",
        answer: "sky",
        stage: 1,
    },
    {
        topic: "Phrasal Verbs",
        question: "What is the meaning of the phrasal verb 'turn up'?",
        answer: "To arrive or appear",
        stage: 1,
    },
    {
        topic: "Reading",
        question:
            "Read the passage and answer the following question: What is the author's purpose in writing this article?",
        answer: "To inform readers about the benefits of meditation",
        stage: 1,
    },
    {
        topic: "Spelling",
        question: "How do you spell the word 'accommodate'?",
        answer: "a-c-c-o-m-m-o-d-a-t-e",
        stage: 1,
    },
    {
        topic: "Listening Comprehension",
        question:
            "Listen to the conversation and answer the following question: Where are they planning to meet?",
        answer: "At the coffee shop",
        stage: 1,
    },
    {
        topic: "Syntax",
        question:
            "Which of the following sentences has the correct word order? a) He ate breakfast. b) Ate he breakfast.",
        answer: "a) He ate breakfast.",
        stage: 1,
    },
    {
        topic: "Reading Comprehension",
        question:
            "Read the passage and answer the following question: Who is the protagonist of the story?",
        answer: "Sarah",
        stage: 1,
    },
    {
        topic: "Grammar",
        question:
            "Which sentence uses the correct form of the verb 'to be'? a) She am tired. b) She is tired.",
        answer: "b) She is tired.",
        stage: 1,
    },
    {
        topic: "Writing",
        question: "Write a synonym for the word 'happy'.",
        answer: "Joyful",
        stage: 1,
    },
    {
        topic: "Vocabulary",
        question: "What is the opposite of the word 'brave'?",
        answer: "Cowardly",
        stage: 1,
    },
];
</script>
