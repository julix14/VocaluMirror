<template>
    <div>
        <div v-show="imageLoaded">
            <img
                :src="props.src"
                class="rounded-2xl drop-shadow-lg object-contain border-solid border-white border-8"
                @load="onImageLoad" />
        </div>
        <div v-show="!imageLoaded">
            <PulseLoader color="#ffffff" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
});

watch(
    () => props.src,
    () => {
        console.log("image changed");
        imageLoaded.value = false;
    }
);

const imageLoaded = ref(false);

function onImageLoad() {
    imageLoaded.value = true;
}
</script>
