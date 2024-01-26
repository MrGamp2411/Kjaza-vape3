// File: login.js

document.addEventListener("DOMContentLoaded", function () {
    // Funzione per effettuare il login con Firebase
    function login() {
        var email = document.getElementById("emailInput").value;
        var password = document.getElementById("passwordInput").value;

        // Assicurati che l'utente abbia inserito un'email e una password
        if (!email || !password) {
            alert("Inserisci un'email e una password valide.");
            return;
        }

        // Esegui il login con Firebase
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (userCredential) {
                // Login completato con successo
                var user = userCredential.user;
                alert("Login completato con successo per l'utente: " + user.email);

                // Reindirizza alla pagina principale dopo il login
                window.location.href = "index.html";
            })
            .catch(function (error) {
                // Gestione degli errori durante il login
                var errorCode = error.code;
                var errorMessage = error.message;

                console.error("Errore durante il login:", errorCode, errorMessage);
                alert("Errore durante il login: " + errorMessage);
            });
    }

    // Aggiungi un event listener al pulsante di login
    var loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.addEventListener("click", login);
    }

    // Aggiungi un event listener per il cambio di stato dell'autenticazione (utente loggato o non loggato)
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // L'utente è loggato
            showProfilePanel(user.email);
        } else {
            // L'utente non è loggato
            hideProfilePanel();
        }
    });

    // Funzione per mostrare il pannello del profilo
    function showProfilePanel(email) {
        // Modifica qui per adattare il tuo layout del pannello del profilo
        console.log("L'utente è loggato:", email);
        // Mostra elementi del pannello del profilo, ad esempio, un div con l'ID "profilePanel"
    }

    // Funzione per nascondere il pannello del profilo
    function hideProfilePanel() {
        // Modifica qui per adattare il tuo layout del pannello del profilo
        console.log("L'utente non è loggato.");
        // Nascondi elementi del pannello del profilo, ad esempio, il div con l'ID "profilePanel"
    }
});
