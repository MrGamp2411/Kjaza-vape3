// File: uiManager.js

document.addEventListener("DOMContentLoaded", function () {
    // Aggiungi un event listener per rilevare lo stato di autenticazione
    firebase.auth().onAuthStateChanged(function (user) {
        var loginButton = document.getElementById("loginButton");
        var logoutButton = document.getElementById("logoutButton");

        if (loginButton && logoutButton) {
            if (user) {
                // L'utente è autenticato, nascondi il tasto di login e mostra il tasto di logout
                loginButton.style.display = "none";
                logoutButton.style.display = "block";
            } else {
                // L'utente non è autenticato, mostra il tasto di login e nascondi il tasto di logout
                loginButton.style.display = "block";
                logoutButton.style.display = "none";
            }
        }
    });
});
