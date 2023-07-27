<template>
    <button
        class="text-4xl w-full text-center p-4 rounded-2xl shadow-2xl transition-all duration-100 ease-in-out cursor-pointer"
        :class="[color, selected ? 'shadow-none translate-y-1 selected-shadow' : '']">
        {{ text }}
    </button>
</template>

<script setup>
defineProps({
    text: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    selected: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped>
.selected-shadow {
    -webkit-box-shadow: inset 10px 10px 12px -5px rgba(10, 10, 10, 0.8);
    box-shadow: inset 10px 10px 12px -5px rgba(10, 10, 10, 0.8);
}
</style>
