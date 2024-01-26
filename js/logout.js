// File: logout.js

document.addEventListener("DOMContentLoaded", function () {
    // Aggiungi un event listener al pulsante di logout
    var logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            firebase.auth().signOut().then(function () {
                // Logout completato con successo
                alert("Logout completato con successo.");
                // Reindirizza alla pagina di login dopo il logout
                window.location.href = "login.html";
            }).catch(function (error) {
                // Gestione degli errori durante il logout
                console.error("Errore durante il logout:", error);
                alert("Errore durante il logout. Riprova.");
            });
        });
    }
});
