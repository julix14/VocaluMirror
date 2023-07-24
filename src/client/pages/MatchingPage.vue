<template>
    <div class="h-fit min-h-screen w-screen bg-rose opacity-75 pt-10">
        <div>
            <p class="text-white text-8xl xl:text-9xl text-center drop-shadow-2xl">Matching</p>
            <p class="text-subHeadingGray text-3xl xl:text-4xl text-center mt-4">
                Pick the correct word for the picture
            </p>
        </div>
        <div class="grid grid-cols-2 mx-20 mt-10">
            <VocaluImage src="https://loremflickr.com/640/640" />
            <div class="w-full flex flex-col justify-between items-center">
                <MatchingButton />
                <MatchingButton />
                <MatchingButton />
                <MatchingButton />
            </div>
        </div>
        <div>&nbsp;</div>
    </div>
</template>

<script setup>
import MatchingButton from "../components/buttons/MatchingButton.vue";
import VocaluImage from "../components/vocaluImage.vue";
</script>
