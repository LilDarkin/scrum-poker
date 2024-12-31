<template>
    <div></div>
</template>

<script setup>
import router from "@/router";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const auth = getAuth();
const database = getDatabase();

const user = auth.currentUser;

if (user) {
    const uid = user.uid;
    const userStatusDatabaseRef = ref(database, 'users/' + uid + '/status');

    const isOfflineForDatabase = {
        selectedPoint: 0,
        state: 'offline',
        last_changed: Date.now(),
    };

    // Update the user's status to offline before logging out
    set(userStatusDatabaseRef, isOfflineForDatabase).then(() => {
        signOut(auth).then(() => {
            router.push('/login');
        }).catch((error) => {
            console.error('Sign Out Error', error);
        });
    }).catch((error) => {
        console.error('Error updating status to offline', error);
    });
} else {
    // If no user is signed in, redirect to login page
    router.push('/login');
}
</script>
