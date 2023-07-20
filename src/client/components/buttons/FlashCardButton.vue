<template>
    <div
        class="flex h-12 w-32 bg-opacity-75 p-2 items-center justify-between rounded-xl drop-shadow-lg"
        :class="getButtonColor()">
        <p>{{ text }}</p>
        <img :src="getFullUrl(props.icon)" class="max-h-full" />
    </div>
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        required: true,
        validator: (value) => {
            return ["turn", "correct", "wrong"].includes(value.toLowerCase());
        },
    },
    text: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
});

const getButtonColor = () => {
    switch (props.type.toLowerCase()) {
        case "turn":
            return "bg-lightBlue";
        case "correct":
            return "bg-correctGreen bg-opacity-75";
        case "wrong":
            return "bg-wrongRed bg-opacity-75";
    }
};

function getFullUrl(relativeUrl) {
    const baseUrl = new URL(import.meta.url);
    const fullPath = `src/client/assets/${relativeUrl}`;
    return new URL(fullPath, baseUrl.origin).href;
}
</script>
