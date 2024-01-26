//File: checkUser.js

document.addEventListener("DOMContentLoaded", function () {
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
});
