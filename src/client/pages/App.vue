<script setup>
import MenuButton from "../components/buttons/MenuButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function goToRoute(route) {
    router.push(route);
}
</script>

<template>
    <div class="bg-orange w-screen h-screen flex flex-col justify-start">
        <div>
            <p class="text-white text-9xl text-center mt-10 drop-shadow-2xl">Welcome to Vocalu</p>
            <p class="text-white text-4xl text-center font-bold mt-4">
                What do you want to train today?
            </p>
        </div>
        <div class="flex justify-around m-10">
            <MenuButton title="Battle" img-path="home/battle-img.png" @click="goToRoute('/battle')" />
            <MenuButton title="Matching" img-path="home/matching-img.png" @click="goToRoute('/matching')" />
            <MenuButton title="Flash Cards" img-path="home/flash-card-img.png" @click="goToRoute('/flash-cards')" />
        </div>
    </div>
</template>

<style scoped></style>
