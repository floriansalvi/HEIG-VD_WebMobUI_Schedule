<script setup>
const model = defineModel()
</script>

<template>
    <div>
        <input
            v-model="model"
            type="text"
            placeholder="search…"
            class="input"
        >
    </div>
</template>

<style scoped>

</style>