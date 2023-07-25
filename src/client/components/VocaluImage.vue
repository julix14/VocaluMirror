<template>
    <div>
        <div v-show="imageLoaded">
            <img
                :src="src"
                class="rounded-2xl drop-shadow-lg object-contain border-collapse border-solid border-white border-8"
                @load="onImageLoad" />
        </div>
        <div v-show="!imageLoaded">
            <PulseLoader color="#ffffff" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

defineProps({
    src: {
        type: String,
        required: true,
    },
});

const imageLoaded = ref(false);

function onImageLoad() {
    console;
    imageLoaded.value = true;
}
</script>
