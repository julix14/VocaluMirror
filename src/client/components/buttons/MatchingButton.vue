<template>
    <div
        class="text-4xl p-4 rounded-2xl shadow-2xl transition-all duration-100 ease-in-out"
        :class="[color, selected ? 'shadow-none translate-y-1 selected-shadow' : '']">
        {{ text }}
    </div>
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
    -webkit-box-shadow: inset 3px 2px 10px 9px rgba(0, 0, 0, 0.5);
    box-shadow: inset 3px 2px 10px 9px rgba(0, 0, 0, 0.5);
}
</style>
