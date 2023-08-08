<template>
    <div
        class="bg-lightBlue bg-opacity-75 w-screen h-fit min-h-screen flex flex-col justify-start items-center">
        <HomeButton />

        <div>
            <p class="text-white text-8xl xl:text-9xl text-center mt-10 drop-shadow-2xl">
                Flash Cards
            </p>
            <p class="text-subHeadingGray text-3xl xl:text-4xl text-center font-bold mt-4">
                Train you with your flash cards
            </p>
        </div>
        <FlashCard
            :flash-card="props.data[counter]"
            :buttons-enabled="counter < props.data.length - 1"
            @nextCard="counter++" />
    </div>
</template>

<script setup>
import FlashCard from "../components/FlashCard.vue";
import HomeButton from "../components/buttons/HomeButton.vue";
import { ref } from "vue";

const props = defineProps({
    data: {
        required: true,
    },
});

console.log(props.data.length);
const counter = ref(0);
console.log(counter.value);
</script>
