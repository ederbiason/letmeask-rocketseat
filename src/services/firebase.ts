import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCVoV1q-ovtGiydMRj--ERyA387T9FTCaE",
    authDomain: "letmeask-c4118.firebaseapp.com",
    databaseURL: "https://letmeask-c4118-default-rtdb.firebaseio.com",
    projectId: "letmeask-c4118",
    storageBucket: "letmeask-c4118.appspot.com",
    messagingSenderId: "624851799283",
    appId: "1:624851799283:web:965932e29f4b11538a7b86"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(); 
const database = firebase.database(); 

export {firebase, auth, database}