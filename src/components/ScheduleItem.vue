<script setup>
import { formatDate, formatTime } from '../modules/utils'

const {entry} = defineProps({
  entry: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['search-course'])

function onLabelClick() {
  emits('search-course', entry.label)
}
</script>

<template>
  <div class="container">
    <div class="item-date">
      {{ formatDate(entry.start) }}
    </div>
    <div class="item-time">
      <div class="item-start">
        {{ formatTime(entry.start) }}
      </div>
      <div class="item-end">
        {{ formatTime(entry.end) }}
      </div>
    </div>
    <div @click="onLabelClick" class="item-clickable">
      <div class="item-label">
        {{ entry.label }}
      </div>
      <div class="item-class">
        {{ entry.class }}
      </div>
    </div>
    <div class="item-room">
      {{ entry.room }}
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.25rem;
}

.container {
  width: inherit;
  display: flex;
  flex-direction: row;
  background-color: #fdf5f1;
  padding: 1rem;
  border-radius: .25rem;
  gap: .25rem;
}

.item-time {
  display: flex;
  flex-direction: column;
  padding: .25rem;
}

.item-date {
  font-size: 1.25rem;
  font-weight: 900;
  width: fit-content;
}
</style>