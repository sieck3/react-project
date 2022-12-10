// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyBqYmPHgNmrqmQIGYlJh4H03066LpLlvYA",
    authDomain: "filessave-73b1a.firebaseapp.com",
    databaseURL: "https://filessave-73b1a-default-rtdb.firebaseio.com",
    projectId: "filessave-73b1a",
    storageBucket: "filessave-73b1a.appspot.com",
    messagingSenderId: "633487640859",
    appId: "1:633487640859:web:a42768c2c73890be49abbe",
    measurementId: "G-H9QQR83B88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();




