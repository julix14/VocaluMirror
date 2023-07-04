<script setup>
import MenuButton from "../components/buttons/MenuButton.vue";
</script>

<template>
    <div class="bg-orange w-screen h-screen flex flex-col justify-start">
        <div class="flex justify-around m-10">
            <MenuButton title="Battle" img-path="home/battle-img.png" />
            <MenuButton title="Matching" img-path="home/matching-img.png" />
            <MenuButton
                title="Flash Cards"
                img-path="home/flash-card-img.png" />
        </div>
    </div>
</template>

<style scoped></style>
