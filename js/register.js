// File: register.js

document.addEventListener("DOMContentLoaded", function () {
    // Funzione per registrare un utente con Firebase
    function registerUser() {
        var email = document.getElementById("emailInput").value;
        var password = document.getElementById("passwordInput").value;
        var confirmPassword = document.getElementById("confirmPasswordInput").value;

        // Verifica che la password e la conferma password siano uguali
        if (password !== confirmPassword) {
            alert("Le password non corrispondono");
            return;
        }

        // Verifica se l'indirizzo email esiste già
        firebase.auth().fetchSignInMethodsForEmail(email)
            .then(function (signInMethods) {
                if (signInMethods.length === 0) {
                    // L'indirizzo email non esiste ancora, procedi con la registrazione
                    return firebase.auth().createUserWithEmailAndPassword(email, password);
                } else {
                    // L'indirizzo email esiste già
                    throw new Error('auth/email-already-in-use');
                }
            })
            .then(function (userCredential) {
                // Utente registrato con successo
                var user = userCredential.user;
                var userId = user.uid;
                var userName = "Nuovo Utente"; // Puoi impostare il nome come preferisci

                // Salva i dati utente nel database Firebase
                saveUserData(userId, userName);
                alert("Registrazione completata con successo!");

                // Reindirizza alla pagina principale dopo la registrazione
                window.location.href = "index.html";
            })
            .catch(function (error) {
                // Gestione degli errori durante la registrazione
                var errorCode = error.code;
                var errorMessage = error.message;

                if (errorCode === 'auth/email-already-in-use') {
                    alert("L'indirizzo email è già registrato. Prova a effettuare il login.");
                } else {
                    console.error("Errore durante la registrazione:", errorCode, errorMessage);
                    alert("Errore durante la registrazione: " + errorMessage);
                }
            });
    }

    // Funzione per salvare i dati utente nel database Firebase
    function saveUserData(userId, name) {
        // Riferimento al percorso nel database dove salvare i dati utente
        const userRef = firebase.database().ref('users/' + userId);

        // Salvare i dati utente
        userRef.set({
            name: name,
            // Altri dati utente...
        });
    }

    // Aggiungi un event listener al pulsante di registrazione
    var registerButton = document.getElementById("registerButton");
    if (registerButton) {
        registerButton.addEventListener("click", registerUser);
    }
});
