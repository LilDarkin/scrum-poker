<template>
    <div class="poker-table">
        <div class="poker-table__seat" v-for="seat in totalPlayers" :key="seat">
            <div class="poker-table__seat__avatar">
                {{ seat }}
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    totalPlayers: {
        type: Number,
        default: 1,
    }
})
</script>

<style scoped>

</style>