import { getDatabase, ref, get, set, update } from 'firebase/database';

const db = getDatabase();

class Room {
  async createRoom(uid) {
    try {
      let roomId = this.generateRoomId()
      const roomsRef = ref(db, `rooms/${roomId}`)

      const snapshot = await get(roomsRef)
      if (snapshot.exists()) {
        return this.createRoom()
      }

      await set(roomsRef, {
        created_at: this.formatDate(new Date()),
        average: 0,
        code: roomId,
        owner: uid,
        isVoting: true,
        players: {}
      })
      return roomId
    } catch (error) {
      console.error('Error adding room: ', error)
      throw error
    }
  }

  generateRoomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let roomId = ''
    for (let i = 0; i < 10; i++) {
      roomId += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return roomId
  }

  formatDate(date) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${month} ${day} ${year}`
  }

  async checkIfKeyExists(key) {
    const keyRef = ref(db, 'rooms/' + key);
    const snapshot = await get(keyRef);
    return snapshot.exists();
  }

  async selectPoint(roomID, player, point) {
    const roomRef = ref(db, 'rooms/' + roomID + '/players/' + player + '/selectedPoint');
    await set(roomRef, point);
  }

  async reveal_start_card(roomID, status) {
    const roomRef = ref(db, 'rooms/' + roomID + '/isVoting');
    const averageRef = ref(db, 'rooms/' + roomID + '/average');
    const playersRef = ref(db, 'rooms/' + roomID + '/players');
    let average = 0;
    let total = 0;

    const updateSelectedPoints = async (roomID) => {
      try {
        // Reference to the players in the room
        const playersRef = ref(db, `rooms/${roomID}/players`);
        
        // Get the snapshot of the players
        const snapshot = await get(playersRef);
    
        // Check if snapshot exists and has children
        if (snapshot.exists()) {
          const updates = {};
    
          snapshot.forEach((childSnapshot) => {
            const playerID = childSnapshot.key;
            // Add the path and value to the updates object
            updates[`rooms/${roomID}/players/${playerID}/selectedPoint`] = 0;
          });
    
          // Apply the updates
          await update(ref(db), updates);
        } else {
          console.log("No players found in the room.");
        }
      } catch (error) {
        console.error("Error updating selectedPoint:", error);
      }
    };

    if (status) {
      try {
        // Fetch players data
        if (status) {
          updateSelectedPoints(roomID);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error('Error updating selectedPoint values:', error);
      }
    } else {
      const snapshot = await get(playersRef);
      if (snapshot.exists()) {
        // Iterate over players and prepare updates
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().selectedPoint) {
            total = total + 1;
            average = average + childSnapshot.val().selectedPoint;
          }
        });
      }
    }

    try {
      await set(roomRef, status);
      average = average / total;
      const formattedAverage = average.toFixed(1);
      await set(averageRef, formattedAverage);
    } catch (error) {
      console.error('Error setting isVoting status:', error);
    }
  }

}
export default new Room()
