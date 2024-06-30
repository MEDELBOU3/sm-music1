// Firebase configuration
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8zBPJkyeKfmdFaW9PJzqkoyZsBYO9kzo",
    authDomain: "sm-music-ca8a9.firebaseapp.com",
    projectId: "sm-music-ca8a9",
    storageBucket: "sm-music-ca8a9.appspot.com",
    messagingSenderId: "273821857220",
    appId: "1:273821857220:web:aa039e6d70149b15df2091",
    measurementId: "G-EZBJ9T6CMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Function to send messages to Firebase Realtime Database
function sendMessageToServer(message) {
    const messageRef = ref(db, 'rooms/' + currentRoom + '/messages');
    push(messageRef, message);
}

// Listen for offer and answer
const offerRef = ref(db, 'rooms/' + currentRoom + '/offer');
onValue(offerRef, (snapshot) => {
    const offer = snapshot.val();
    if (offer) {
        if (!peerConnection) {
            setupPeerConnection();
        }
        handleOffer(offer);
        remove(offerRef);
    }
});

const answerRef = ref(db, 'rooms/' + currentRoom + '/answer');
onValue(answerRef, (snapshot) => {
    const answer = snapshot.val();
    if (answer) {
        handleAnswer(answer);
        remove(answerRef);
    }
});

const candidateRef = ref(db, 'rooms/' + currentRoom + '/candidate');
onValue(candidateRef, (snapshot) => {
    const candidate = snapshot.val();
    if (candidate) {
        handleCandidate(candidate);
        remove(candidateRef);
    }
});

// Function to send ICE candidates to Firebase Realtime Database
function handleIceCandidate(event) {
    if (event.candidate) {
        const candidateRef = ref(db, 'rooms/' + currentRoom + '/candidate');
        push(candidateRef, event.candidate.toJSON());
    }
}



