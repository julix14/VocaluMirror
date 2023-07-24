<template>
    <div class="bg-orange w-screen h-fit min-h-screen flex flex-col justify-start">
        <div>
            <p class="text-white text-8xl xl:text-9xl text-center mt-10 drop-shadow-2xl">
                Welcome to Vocalu
            </p>
            <p class="text-white text-4xl text-center font-bold mt-4">
                What do you want to train today?
            </p>
        </div>
        <div class="flex justify-around m-10">
            <MenuButton title="Battle" img-path="home/battle-img.png" route="/battle" />
            <MenuButton title="Matching" img-path="home/matching-img.png" route="/matching" />
            <MenuButton
                title="Flash Cards"
                img-path="home/flash-card-img.png"
                route="/flash-cards" />
        </div>
    </div>
</template>

<script setup>
import MenuButton from "../components/buttons/MenuButton.vue";
</script>

<style scoped></style>
