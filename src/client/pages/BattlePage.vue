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
        <div class="grid grid-cols-4 grid-rows-3 h-full mt-8 justify-items-center">
            <BattleCharacter
                class="row-start-3"
                avatar="avatars/avatar1.png"
                name="Player"
                health="31" />

            <MatchingButton class="col-start-2 col-span-2" color="bg-white" />
            <BattleCharacter
                class="col-start-4"
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
</script>
