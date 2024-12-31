<template>
    <div v-if="authUser" class="card__contents p-4">
        <div class="card flex flex-col justify-self-center justify-items-center items-center ml-5 gap-3">
            <h2 class="text-md font-bold text-center text-white uppercase">messages</h2>
            <div class="card__content p-3">
                <div class="h-full flex flex-col">
                    <p class="text-white break-words" v-for="message in messages" :key="message.id">
                        <strong>{{ message.senderName }}:</strong> {{ message.text }}
                    </p>
                </div>
            </div>
            <input v-model="newMessage"
                class="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder=".....">
            <button @click="sendMessage"
                class="cursor-pointer transition-all min-w-[120px] bg-blue-800 text-white py-2 rounded-lg border-blue-900 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                SEND
            </button>
        </div>
        <div class="flex flex-col flex-wrap justify-center items-center gap-3">
            <div class="flex flex-row flex-wrap justify-center gap-2">
                <div v-for="player in players" :key="player" class="flip-card select-none">
                    <div :class="['flip-card-inner', { 'rotate-y-180': !isVoting && owner !== player.uid }]">
                        <div class="flip-card-front" :class="{ 'selected': player.selectedPoint }">
                            <p class="title">{{ player.name }}</p>
                            <p>{{ owner === player.uid ? 'Spectator' : '' }}</p>
                        </div>
                        <div class="flip-card-back">
                            <p class="title">{{ player.name }}</p>
                            <p>{{ player.selectedPoint }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="reveal_start_card" :disabled="hasNotSelectedPoint || isDisabled"
                class="cursor-pointer transition-all min-w-[150px] bg-blue-800 text-white py-2 rounded-lg border-blue-900 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                {{ isVoting ? 'REVEAL CARDS' : 'START VOTING' }}
            </button>
        </div>
        <div v-if="owner !== authUser.uid && isVoting" class="m-auto flex flex-col flex-wrap justify-center gap-2">
            <h1 class="text-white text-center font-bold">SELECT ESTIMATE</h1>
            <div class="flex flex-row flex-wrap justify-center gap-4">
                <div v-for="point in points" :key="point" class="card-point" @click="selectPoint(point)">
                    <div class="card-content flex items-center justify-center max-h-[100px]"
                        :class="{ 'selected-point': selectedPoint === point }">
                        <p class="text-2xl">{{ point }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="!isVoting" class="flex flex-col justify-self-center m-auto select-none">
            <div class="average-card flex flex-col justify-self-center gap-5">
                <h2>Average</h2>
                <h2><strong>{{ average }}</strong></h2>
            </div>
        </div>
    </div>
</template>

<script>
import { getDatabase, ref, onValue, push, set, serverTimestamp, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PokerTable from "../components/PokerTable.vue";
import RoomService from "@/Services/Room.js";
import { ref as refs } from "vue";

export default {
    components: { PokerTable },
    data() {
        return {
            isDisabled: false,
            hasNotSelectedPoint: false,
            isVoting: true,
            owner: '',
            average: 0,
            room: null,
            roomID: null,
            selectedPoint: 0,
            messages: [],
            players: [],
            newMessage: '',
            authUser: null,
            points: [
                0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
            ]
        };
    },
    created() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.authUser = user;
                const roomId = this.$route.params.id;
                const db = getDatabase();
                const roomRef = ref(db, 'rooms/' + roomId);

                onValue(roomRef, (snapshot) => {
                    this.room = snapshot.val();
                    this.average = snapshot.val().average;
                    this.owner = snapshot.val().owner;
                    this.isVoting = snapshot.val().isVoting;
                });

                const messagesRef = ref(db, 'rooms/' + roomId + '/messages');
                onValue(messagesRef, (snapshot) => {
                    this.messages = [];
                    snapshot.forEach((childSnapshot) => {
                        this.messages.push({ id: childSnapshot.key, ...childSnapshot.val() });
                    });
                });

                const playersRef = ref(db, 'rooms/' + roomId + '/players');
                onValue(playersRef, (snapshot) => {
                    this.players = [];
                    const promises = [];

                    snapshot.forEach((childSnapshot) => {
                        const userStatusRef = ref(db, 'users/' + childSnapshot.key + '/status');
                        const promise = get(userStatusRef).then((userSnapshot) => {
                            if (userSnapshot.exists() && userSnapshot.val().state === 'online') {
                                const player = {
                                    name: childSnapshot.val().name,
                                    uid: childSnapshot.key,
                                    selectedPoint: childSnapshot.val().selectedPoint ?? 0
                                };
                                // Check if player already exists in this.players
                                if (!this.players.some(p => p.uid === player.uid)) {
                                    this.players.push(player);
                                }
                            }
                        });
                        promises.push(promise);
                    });

                    // If one of the players is not yet selected, set hasNotSelectedPoint to true
                    // Promise.all(promises).then(() => {
                    //     // Sort players by name
                    //     this.players.sort((a, b) => a.name.localeCompare(b.name));

                    //     this.hasNotSelectedPoint = false;

                    //     for (const player of this.players) {
                    //         if (player.uid !== this.owner && player.selectedPoint === 0) {
                    //             this.hasNotSelectedPoint = true;
                    //             break;
                    //         }
                    //     }
                    // });
                });

                RoomService.selectPoint(roomId, this.authUser.uid, null);
                this.roomID = roomId
                this.addPlayerToRoom(roomId);

                const userStatusPathRef = ref(db, 'users');
                onValue(userStatusPathRef, (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const playerID = childSnapshot.key;
                        const status = childSnapshot.val().status?.state;
                        if (status === 'offline') {
                            const playerRef = ref(db, 'rooms/' + roomId + '/players/' + playerID);
                            set(playerRef, null);
                            this.players = this.players.filter(player => player.uid !== playerID);
                        } else if (status === 'online') {
                            // Re-add player if online
                            const playerRef = ref(db, 'rooms/' + roomId + '/players/' + playerID);
                            get(playerRef).then((playerSnapshot) => {
                                if (playerSnapshot.exists()) {
                                    const playerData = playerSnapshot.val();
                                    const player = {
                                        name: playerData.name,
                                        uid: playerID,
                                        selectedPoint: playerData.selectedPoint ?? null
                                    };
                                    // Check if player already exists in this.players
                                    if (!this.players.some(p => p.uid === player.uid)) {
                                        this.players.push(player);
                                    }
                                }
                            });
                            this.selectedPoint = 0;
                            RoomService.reveal_start_card(this.roomID, true);
                        }
                    });
                });

            } else {
                this.authUser = null;
            }
        });
    },
    methods: {
        reveal_start_card() {
            this.isDisabled = true;
            this.selectedPoint = null;
            this.isVoting = !this.isVoting;
            RoomService.reveal_start_card(this.roomID, this.isVoting);

            setTimeout(() => {
                this.isDisabled = false
            }, 1500);
        },
        selectPoint(point) {
            if (this.selectedPoint === point) {
                this.selectedPoint = 0;
            } else {
                this.selectedPoint = point;
            }

            RoomService.selectPoint(this.roomID, this.authUser.uid, this.selectedPoint);
        },
        getSeatStyle(index) {
            const angle = (index / 10) * 360;
            const radius = 120; // Distance from center of the table
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            return {
                transform: `translate(${x}px, ${y}px)`,
            };
        },
        sendMessage() {
            if (this.newMessage) {
                const roomId = this.$route.params.id;
                const db = getDatabase();
                const messagesRef = ref(db, 'rooms/' + roomId + '/messages');
                const newMessageRef = push(messagesRef);

                // Get the sender's name
                const player = this.players.find(player => player.uid === this.authUser.uid);
                const senderName = player ? player.name : 'Unknown';

                set(newMessageRef, {
                    text: this.newMessage,
                    timestamp: serverTimestamp(),
                    uid: this.authUser.uid,
                    senderName: senderName,
                });
                this.newMessage = '';
            }
        },
        addPlayerToRoom(roomId) {
            const db = getDatabase();
            const userRef = ref(db, 'users/' + this.authUser.uid);

            onValue(userRef, (snapshot) => {
                const player = {
                    name: snapshot.val().name,
                    uid: snapshot.key,
                    selectedPoint: snapshot.val().selectedPoint ?? 0
                };
                const roomPlayersRef = ref(db, 'rooms/' + roomId + '/players/' + this.authUser.uid);
                set(roomPlayersRef, player);
            });
        },
    },
};
</script>

<style scoped>
@import url('../assets/room.css');

.selected-point {
    background-color: #049cdc !important;
}
</style>
