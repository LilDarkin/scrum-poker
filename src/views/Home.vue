<!-- RoomList.vue -->
<template>
    <div class="content">
        <section class="relative  bg-blueGray-50">
            <div class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                <div class="container relative mx-auto">
                    <div class="items-center flex flex-wrap">
                        <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                            <div class="pr-12 contents">
                                <h1 class="text-white font-semibold text-5xl">
                                    Scrum Poker for agile teams
                                </h1>
                                <p class="mt-4 text-lg text-white">
                                    It is a user-friendly online tool that facilitates efficient poker planning sessions
                                    for
                                    agile teams. It simplifies task estimation using digital cards, promoting
                                    collaboration
                                    and informed decision-making during sprint planning.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                    style="transform: translateZ(0px)">
                    <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </div>
            <section class="pb-10 bg-blueGray-200 -mt-24">
                <div class="flex flex-wrap justify-center gap-5">
                    <div class="card relative flex flex-col min-w-0 bg-white w-full mb-8 shadow-lg rounded-lg">
                        <div class="card__content px-4 py-5 flex flex-col items-center">
                            <div
                                class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                                <i class="fas fa-award"></i>
                            </div>
                            <h6 class="text-xl text-white font-semibold">Chat System</h6>
                            <p class="mt-2 mb-4 text-white">
                                A built-in chat system resembling popular messengers, fostering real-time
                                collaboration and streamlined communication during sprint planning sessions.
                            </p>
                        </div>
                    </div>

                    <div class="card relative flex flex-col min-w-0 bg-white w-full mb-8 shadow-lg rounded-lg">
                        <div class="card__content px-4 py-5 grid grid-cols-1 place-items-center">
                            <div class="text-white p-3 text-center mb-5 shadow-lg w-12 h-12 rounded-full bg-red-400">
                                <i class="fas fa-award"></i>
                            </div>
                            <h6 class="text-xl text-white font-semibold">Create a room</h6>
                            <p class="mt-2 text-white">
                                Create now to streamline collaboration and sprint planning with 'Scrum Poker for
                                Agile Teams,' complete with integrated chat.
                            </p>
                            <div class="flex justify-center mt-6">
                                <button @click="openSettings" class="card__btn card__create" alt="create">
                                    <i>c</i>
                                    <i>r</i>
                                    <i>e</i>
                                    <i>a</i>
                                    <i>t</i>
                                    <i>e</i>
                                    <i>&nbsp;</i>
                                    <i>r</i>
                                    <i>o</i>
                                    <i>o</i>
                                    <i>m</i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        class="card relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                        <div class="card__content px-4 py-5 grid grid-cols-1 place-items-center">
                            <div
                                class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                                <i class="fas fa-fingerprint"></i>
                            </div>
                            <h6 class="text-xl font-semibold text-white">Join a room</h6>
                            <p class="mt-2 text-white">
                                Explore Poker Planning Online to join virtual rooms for agile team collaboration,
                                making sprint planning efficient and collaborative.
                            </p>
                            <div class="flex justify-center mt-6">
                                <button @click="openJoinModal" class="card__btn card__join" alt="join">
                                    <i>j</i>
                                    <i>o</i>
                                    <i>i</i>
                                    <i>n</i>
                                    <i>&nbsp;</i>
                                    <i>r</i>
                                    <i>o</i>
                                    <i>o</i>
                                    <i>m</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>

    <!-- MODAL -->

    <!-- CREATE -->
    <Modal :isVisible="showCreateModal" @close="showCreateModal = false" class="select-none">
        <h2 class="text-xl font-bold mb-4">Settings</h2>
        <Checkbox v-model="ownerreveal" id="reveal" text="Everyone can reveal cards" :disabled="true" title="Soon... ❤️"/>
        <label class="mb-3 block text-gray-500 text-sm">Default: Owner only</label>
        <label class="mb-3 block text-gray-500 text-sm">NOTE: Owner can't select cards</label>
        <Checkbox v-model="autoreveal" @change="autoreveal = !autoreveal" id="autoreveal" :disabled="true" title="Soon... ❤️"
            text="Automatic reveal cards" />
        <div v-if="autoreveal" class="mt-2 fade-in">
            <label for="seconds" class="block text-gray-800 font-semibold text-sm">Delay in second(s)</label>
            <div class="mt-2">
                <input v-model="delay" @change="checkDelayInput" type="number" min="0" max="5" name="seconds"
                    class="appearance-auto w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800" />
            </div>
        </div>
        <div class="flex justify-between mt-5 gap-10">
            <button @click="showCreateModal = false"
                class="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                CANCEL
            </button>
            <button @click="createRoom"
                class="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                CREATE
            </button>
        </div>
    </Modal>

    <!-- JOIN -->
    <Modal :isVisible="showJoinModal" @close="showJoinModal = false" class="select-none">
        <h2 class="text-xl font-bold mb-4 text-center uppercase">Join room</h2>
        <div class="w-full max-w-xs bg-white rounded-lg font-mono">
            <input
                class="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder="Enter room ID here" type="text" v-model="code" />
        </div>
        <div class="flex justify-between mt-5 gap-10">
            <button @click="showJoinModal = false"
                class="cursor-pointer transition-all min-w-[120px] bg-red-500 text-white px-6 py-2 rounded-lg border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                CANCEL
            </button>
            <button @click="joinRoom"
                class="cursor-pointer transition-all min-w-[120px] bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                JOIN
            </button>
        </div>
    </Modal>
</template>

<script setup>
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted, ref } from 'vue';
import Swal from "sweetalert2";
import router from "@/router";
import RoomService from "@/Services/Room.js";
import Modal from '@/components/Modal.vue';
import Checkbox from '@/components/Inputs/Checkbox.vue';

const db = getDatabase();
const authUser = ref(null);
const autoreveal = ref(false);
const delay = ref(0);
const ownerreveal = ref(false);
const code = ref('');

const showCreateModal = ref(false);
const showJoinModal = ref(false);

onMounted(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            authUser.value = user;
        } else {
            authUser.value = null;
        }
    });
});

const checkDelayInput = () => {
    if (delay.value < 0 || delay.value > 5) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Delay must be between 0 and 5'
        })
        delay.value = 0
    }
}

const openSettings = () => {
    autoreveal.value = false;
    delay.value = 0;
    ownerreveal.value = false;

    if (authUser.value) {
        showCreateModal.value = true;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must be logged in to create a room'
        }).then(() => {
            router.push('/login');
        })
    }
}

const openJoinModal = () => {
    if (authUser.value) {
        showJoinModal.value = true;
        code.value = '';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must be logged in to join a room'
        }).then(() => {
            router.push('/login');
        })
    }
}

const createRoom = () => {

    if (authUser.value) {
        RoomService.createRoom(authUser.value.uid)
            .then(roomID => {
                Swal.fire({
                    icon: 'success',
                    title: 'Room created',
                    html: 'Your room ID is <b>' + roomID + '</b>'
                }).then(() => {
                    router.push('/room/' + roomID);
                })
            })
        showCreateModal.value = false;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must be logged in to create a room'
        }).then(() => {
            router.push('/login');
        })
    }
}

const joinRoom = () => {
    if (authUser.value) {
        RoomService.checkIfKeyExists(code.value)
        .then(exists => {
            if (exists) {
                router.push('room/' + code.value);
            } else {
                showJoinModal.value = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Room does not exist'
                })
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must be logged in to create a room'
        }).then(() => {
            router.push('/login');
        })
    }
}
</script>

<style scoped>
@import url('@/assets/home.css');

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.fade-in {
    animation: fadeIn .2s ease-in-out;
}
</style>