import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAbnAnTOPMCUi9SzNiKQdp8ppC11TPbNBs",
    authDomain: "wireframer-final-proj.firebaseapp.com",
    databaseURL: "https://wireframer-final-proj.firebaseio.com",
    projectId: "wireframer-final-proj",
    storageBucket: "wireframer-final-proj.appspot.com",
    messagingSenderId: "15136092989",
    appId: "1:15136092989:web:ee3315d580278b48a24b54",
    measurementId: "G-GZX5RBQ1EP"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;