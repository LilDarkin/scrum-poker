<template>
    <div v-if="isVisible" class="fixed inset-0 fade-in z-50 h-full flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative">
            <div
                class="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse">
            </div>
            <div id="form-container"
                class="bg-white p-16 rounded-lg shadow-2xl w-auto relative z-10 transform transition duration-500 ease-in-out">
                <button @click="close" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    &times;
                </button>
                <slot></slot>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['close'],
    methods: {
        close() {
            this.$emit('close');
        },
    },
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn .3s ease-in-out;
}
</style>