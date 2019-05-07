import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

var config = {
    apiKey: "AIzaSyDhA4dHv4pKv9bPatxv7WQbMgFBP1Htmvw",
    authDomain: "react-password-ebef5.firebaseapp.com",
    databaseURL: "https://react-password-ebef5.firebaseio.com",
    projectId: "react-password-ebef5",
    storageBucket: "react-password-ebef5.appspot.com",
    messagingSenderId: "68060031571"
};

firebase.initializeApp(config);

export const db = firebase.database();
export const auth = firebase.auth();
