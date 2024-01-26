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
});
