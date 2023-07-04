<template>
    <div
        class="bg-white flex flex-col w-80 h-80 rounded-3xl text-center hover:h-96 ease-in-out duration-200 cursor-pointer"
        @mouseenter="textVisible = true"
        @mouseleave="textVisible = false">
        <img :src="props.imgPath" class="p-2 z-10" />
        <Transition
            enter-active-class="duration-300 ease-in-out"
            enter-from-class="-m-20 opacity-0 -z-10"
            enter-to-class="m-0 opacity-100"
            leave-active-class="duration-300 ease-in-out"
            leave-from-class="m-0 opacity-100"
            leave-to-class="-m-20 opacity-0 -z-10">
            <span class="text-6xl font-bold" v-if="textVisible">{{
                title
            }}</span>
        </Transition>
    </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
    imgPath: {
        type: String,
        default: "src/client/assets/home/boxing-gloves.png",
    },
    title: {
        type: String,
        default: "Battle",
    },
    route: {
        type: String,
        default: "/test",
    },
});

const textVisible = ref(false);
</script>
