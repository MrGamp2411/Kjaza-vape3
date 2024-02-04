// File: firebaseConnection.js

// Configurazione di Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCSH0yUzb3QLXgM6vf_eUCQpnibg-Po-as",
    authDomain: "prova-kjazavape.firebaseapp.com",
    projectId: "prova-kjazavape",
    storageBucket: "prova-kjazavape.appspot.com",
    messagingSenderId: "236654546011",
    appId: "1:236654546011:web:30197308ef656ccc53437e",
    measurementId: "G-4V4NYSF8GB"
};

// Inizializzazione di Firebase
firebase.initializeApp(firebaseConfig);

// Ottieni un riferimento al database (se lo stai usando)
// Nota: Assicurati di includere la libreria firebase-database.js nel tuo HTML
const database = firebase.database();

// Rendi firebase e database globali
window.firebase = firebase;
window.database = database;
