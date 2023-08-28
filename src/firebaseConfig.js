import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const App = initializeApp ({
    apiKey: "AIzaSyCFG001YFo4tKqdJ7du_8BaaPs5jXXID-8",
    authDomain: "street-shoppe.firebaseapp.com",
    databaseURL: "https://street-shoppe.firebaseio.com",
    projectId: "street-shoppe",
    storageBucket: "street-shoppe.appspot.com",
    messagingSenderId: "472124793044",
    appId: "1:472124793044:web:b9bb948fbdb888b1aa9b41",
    measurementId: "G-B5S2HSH97V"
});

export const Storage = getStorage(App);

