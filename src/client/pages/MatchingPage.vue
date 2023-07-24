<template>
    <div class="h-fit min-h-screen w-screen bg-rose opacity-75 pt-10">
        <div>
            <p class="text-white text-8xl xl:text-9xl text-center drop-shadow-2xl">Matching</p>
            <p class="text-subHeadingGray text-3xl xl:text-4xl text-center mt-4">
                Pick the correct word for the picture
            </p>
        </div>
        <MatchingButton />
    </div>
</template>

<script setup>
import MatchingButton from "../components/buttons/MatchingButton.vue";
</script>
