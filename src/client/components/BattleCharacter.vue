<template>
    <div class="flex flex-col justify-center w-36 h-36 drop-shadow-2xl relative">
        <div class="w-full bg-gray-200 rounded-xl">
            <div
                class="text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-2xl duration-"
                :class="{
                    'bg-red-700': props.health < 30,
                    'bg-orange': props.health >= 30 && props.health <= 60,
                    'bg-green-700': props.health > 60,
                }"
                :style="{ width: props.health + '%' }">
                {{ props.health }}
            </div>
        </div>
        <img :src="getFullUrl(avatar)" alt="characterImage" class="aspect-square mt-2" />
        <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
            <div
                v-if="healthDiff"
                :class="healthDiff > 0 ? 'text-green-500' : 'text-red-500'"
                class="text-6xl font-bold">
                {{ healthDiff > 0 ? "+" : "" }}{{ healthDiff }}
            </div>
        </div>
        <p class="text-subHeadingGray text-2xl text-center">{{ name }}</p>
    </div>
</template>

<script setup>
import { watch, ref } from "vue";
const props = defineProps({
    name: {
        type: String,
        required: true,
        default: "Player",
    },
    avatar: {
        type: String,
        required: true,
        default: "../assets/avatars/avatar1.png",
    },
    health: {
        type: Number,
        required: true,
        default: 31,
    },
});

const healthDiff = ref(0);

watch(
    () => props.health,
    (newVal, oldVal) => {
        healthDiff.value = newVal - oldVal;
        setTimeout(() => {
            resetHealthDiff();
        }, 3200);
    }
);

function getFullUrl(relativeUrl) {
    const baseUrl = new URL(import.meta.url);
    const fullPath = `src/client/assets/${relativeUrl}`;
    return new URL(fullPath, baseUrl.origin).href;
}

async function resetHealthDiff() {
    healthDiff.value = 0;
}
</script>

<style scoped></style>
