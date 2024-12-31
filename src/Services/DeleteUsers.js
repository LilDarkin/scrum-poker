import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

// Load the service account key file
const serviceAccount = JSON.parse(
  await readFile(
    new URL('./pokeronline.json', import.meta.url)
  )
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pokeronline-748c4-default-rtdb.asia-southeast1.firebasedatabase.app'
});

const auth = admin.auth();
const db = admin.database();

async function deleteAnonymousUsers(batchSize = 100) {
  let nextPageToken = undefined;

  do {
    try {
      // Log the nextPageToken for debugging
      console.log(`Fetching users with token: ${nextPageToken}`);

      const listUsersResult = await auth.listUsers(batchSize, nextPageToken);

      if (listUsersResult.users.length > 0) {
        console.log(`Found ${listUsersResult.users.length} users`);

        const deletePromises = listUsersResult.users
          .filter(userRecord => userRecord.providerData.length === 0)
          .map(userRecord => {
            console.log(`Deleting anonymous user: ${userRecord.uid}`);
            return auth.deleteUser(userRecord.uid);
          });

        await Promise.all(deletePromises);
      } else {
        console.log('No users found.');
      }

      // Update the nextPageToken
      nextPageToken = listUsersResult.pageToken || null;
      console.log(`Next page token: ${nextPageToken}`);

    } catch (error) {
      console.error('Error fetching or deleting users:', error);
      // Optional: Stop the loop if an error occurs
      break;
    }

  } while (nextPageToken);

  console.log('All anonymous users deleted');
}
deleteAnonymousUsers()
  .catch((error) => console.error('Error deleting anonymous users:', error));
  
db.ref('users').remove();