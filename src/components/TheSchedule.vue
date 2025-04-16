<script setup>
import { ref, computed, watchEffect, nextTick } from 'vue';
import TheClassSelector from './TheClassSelector.vue';
import TheSearchInput from './TheSearchInput.vue';
import ScheduleItem from './ScheduleItem.vue';
import { useJsonStorage } from '../composables/useJsonStorage';
import { useFetchJson } from '../composables/useFetchJson';

const {data: search} = useJsonStorage('searchTerm', '')
const {data: selectedClasses} = useJsonStorage('selectedClasses', [])
const {data: showHistory} = useJsonStorage('showHistory', false)

const {data: schedule, error, loading, abort} = useFetchJson("/api/schedule/all")

const scheduleSorted = computed(() => {
    if(!schedule.value) return []
    return schedule.value.sort((a, b) => new Date(a.start) - new Date(b.start))
})

const scheduleAfter = computed(() => {
    if(showHistory.value) return scheduleSorted.value
    const now = new Date()
    return scheduleSorted.value.filter(entry => new Date(entry.end) >= now)
})

const scheduleFiltered = computed(() => {
    let filtered = scheduleAfter.value
    if(selectedClasses.value.length > 0) {
        filtered = scheduleAfter.value.filter(entry => {
            return selectedClasses.value.includes(entry.class)
        })
    }
    if(search.value) {
        filtered = filtered.filter(entry => {
            return entry.label.toLowerCase().includes(search.value.toLowerCase())
        })
    }
    return filtered
})

function resetAll() {
    search.value = ''
    selectedClasses.value = []
    showHistory.value = false
}

function onSearchCourse(course) {
    search.value = course
}

</script>

<template>
    <div class="filter-bar">
        <label>
          <input type="checkbox" v-model="showHistory" />
          Afficher l'historique
        </label>
        <button @click="resetAll" class="reset-btn">
          Vider les filtres
        </button>
      </div>
    <TheSearchInput v-model="search" />
    <div class="schedule-list">
        <ScheduleItem
            v-for="(entry, ind) of scheduleFiltered"
            :key="entry.id"
            :entry="entry"
            @search-course="onSearchCourse"
        />
    </div>
</template>

<style scoped>
.schedule-list {
    min-width: 200px;
    width: 60vw;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>