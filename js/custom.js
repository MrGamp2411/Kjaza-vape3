document.addEventListener("DOMContentLoaded", function () {
    // Codice JavaScript eseguito dopo il caricamento completo del documento
    getYear();

    // Funzione per ottenere l'anno corrente
    function getYear() {
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();

        // Assicurati che l'elemento con ID "displayYear" esista nella pagina
        var displayYearElement = document.querySelector("#displayYear");
        if (displayYearElement) {
            displayYearElement.innerHTML = currentYear;
        }
    }

    // Funzione per salvare i dati utente nel database Firebase
    function saveUserData(userId, name) {
        // Riferimento al percorso nel database dove salvare i dati utente
        const userRef = database.ref('users/' + userId);

        // Salvare i dati utente
        userRef.set({
            name: name,
            // Altri dati utente...
        });
    }

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

    // Funzione per effettuare il login con Firebase
    function loginUser() {
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

    // Aggiungi un event listener al pulsante di registrazione
    var registerButton = document.getElementById("registerButton");
    if (registerButton) {
        registerButton.addEventListener("click", registerUser);
    }

    // Aggiungi un event listener al pulsante di login
    var loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.addEventListener("click", loginUser);
    }
});
