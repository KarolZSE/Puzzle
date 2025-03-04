    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
    import { getFirestore, collection, addDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
    import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyD7o35jWsWjL2Ztuv9TK8C8V1duI6h_yoQ",
      authDomain: "puzzlegame-a3cec.firebaseapp.com",
      projectId: "puzzlegame-a3cec",
      storageBucket: "puzzlegame-a3cec.firebasestorage.app",
      messagingSenderId: "397914192255",
      appId: "1:397914192255:web:c88ef2b21590fd0f34c24a"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    signInAnonymously(auth).then(() => {
        // Signed in..
        console.log('Signed in');
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

function DatabaseCall(SaveScoreToDatabase, name, Score, sizesquare) {
    onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log('User is signed in');

        // Add a new document with a generated id.
        console.log("IMPORTANT" + SaveScoreToDatabase);
        if (SaveScoreToDatabase == 1) {
            console.log("IMPORTANT" + name.value);
            console.log("IMPORTANT" + Score);
            addDoc(collection(db, "users"), {
                uid: uid,
                name: name.value,
                score: Score,
                puzzles: sizesquare,
            }).then(() => {
                console.log("Document written with ID: ", uid);
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
        }


        const usersSnapshot = await getDocs(collection(db, "users"));
        const leaderboardList = document.getElementById('leaderboard-list');
        leaderboardList.innerHTML = '';

for (const userDoc of usersSnapshot.docs) {
const userDocRef = doc(db, "users", userDoc.id);
const subcollectionSnapshot = await getDocs(collection(userDocRef, "knownSubcollectionName"));

const userData = userDoc.data();
const userName = userData.name;
const userScore = userData.score;
const userPuzzle = userData.puzzles;
const listItem = document.createElement('li');
listItem.innerHTML = `<span>${userName}</span><span>${userScore}</span><span>${userPuzzle}</span>`;
listItem.setAttribute('data-user-score', userScore);
await console.log(listItem.getAttribute('data-user-score'));
leaderboardList.appendChild(listItem);
console.log(`User ${userDoc.id} has ${userName} no documents in the subcollection.`);

}
await sortList();

function sortList() {
var list, i, switching, b, shouldSwitch;
list = document.getElementById("leaderboard-list");
switching = true;
/* Make a loop that will continue until
no switching has been done: */
while (switching) {
// start by saying: no switching is done:
switching = false;
b = list.getElementsByTagName("LI");
// Loop through all list-items:
for (i = 0; i < (b.length - 1); i++) {
  // start by saying there should be no switching:
  shouldSwitch = false;
  /* check if the next item should
  switch place with the current item: */
  console.log(b[i].getAttribute('data-user-score'));
  console.log(b[i + 1]);
  if (Number(b[i].getAttribute('data-user-score')) < Number(b[i + 1].getAttribute('data-user-score'))) {
    /* if next item is numerically
    lower than current item, mark as a switch
    and break the loop: */
    shouldSwitch = true;
    break;
  }
}
if (shouldSwitch) {
  /* If a switch has been marked, make the switch
  and mark the switch as done: */
  b[i].parentNode.insertBefore(b[i + 1], b[i]);
  switching = true;
}
}
}

    } else {
        console.log("You are sign out, want be able to save your data");
    }
})};
window.DatabaseCall = DatabaseCall;
DatabaseCall(0);
