<script setup>
import { computed } from 'vue';

const { schedule } = defineProps({
    schedule: {
        type: Array,
        required: true
    }
})

const currentClasses = defineModel({
    type: Array,
    default: []
})

const allClasses = computed(() => {
    const classes = new Set(schedule.map(entry => entry.class))
    return Array.from(classes).sort((a, b) => a.localeCompare(b))
})

function toggleClass(className) {
    if(currentClasses.value.includes(className)){
        currentClasses.value = currentClasses.value.filter(c => c !== className)
    } else {
        currentClasses.value.push(className)
    }
}
</script>

<template>
    <button
        v-for="className in allClasses"
        :key="className"
        :class="['class-btn', curClasses.includes(className) ? 'selected' : '']"
        @click="toggleClass(className)"
    >
    <span v-if="curClasses.includes(className)" class="checkmark">✔</span>
    {{ className }}
    </button>
</template>

<style scoped>

</style>