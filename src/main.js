import './assets/main.css'
import './assets/tailwind.css'
import '@/Services/Firebase.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { database, auth } from '@/Services/Firebase.js';
import { ref, onDisconnect, set, onValue, get, child } from "firebase/database";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

const app = createApp(App)

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const userStatusDatabaseRef = ref(database, 'users/' + uid + '/status');

        const isOfflineForDatabase = {
            state: 'offline',
            last_changed: Date.now(),
        };

        const isOnlineForDatabase = {
            state: 'online',
            last_changed: Date.now(),
        };

        try {
            const snapshot = await get(child(ref(database), 'users/' + uid + '/status'));
            if (!snapshot.exists()) {
                set(userStatusDatabaseRef, isOnlineForDatabase);
            }
        } catch (error) {
            console.error('Error checking user status:', error);
        }

        // Set up onDisconnect to update the database when the user goes offline
        onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
            // Set user status to online when they connect
            set(userStatusDatabaseRef, isOnlineForDatabase);
        });

        // Monitor connection status
        const connectedRef = ref(database, '.info/connected');
        onValue(connectedRef, (snapshot) => {
            if (snapshot.val() === true) {
                set(userStatusDatabaseRef, isOnlineForDatabase);
            } else {
                set(userStatusDatabaseRef, isOfflineForDatabase);
            }
        });
    }
});

app.use(router)

app.mount('#app')
