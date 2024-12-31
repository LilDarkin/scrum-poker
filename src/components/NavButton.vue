<template>
    <div class="group select-none relative flex justify-center items-center text-zinc-600 text-sm font-bold">
        <div v-if="!isDropDown" @click="$router.push(route)" :title="tooltip"
            class="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-blue-200 to-purple-200 p-3 rounded-full cursor-pointer duration-300">
            <component class="icon" :is="icon"></component>
            <span class="text-[0px] group-hover:text-sm duration-300">{{ text }}</span>
        </div>
    </div>
</template>


<script setup>
import { markRaw } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: '',
    },
    tooltip: {
        type: String,
        default: '',
    },
    route: {
        type: String,
        default: '',
    },
    routes: {
        type: Array,
        default: () => [],
    },
    isDropDown: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: Object,
        required: true,
        default: () => markRaw({}),
    },
})
</script>


<style scoped>
.button-btn {
    outline: 0 !important;
    border: 0 !important;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all ease-in-out 0.3s;
    cursor: pointer;
}

.button-btn:hover {
    transform: translateY(-3px);
}

.icon {
    font-size: 20px;
}
</style>