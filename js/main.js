"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Jeanette Söderman
 */

// Hämtar formulär och sökfält från Html
const form = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorMessage = document.querySelector("#error");

// Lyssnar efter att formulär skickas
form.addEventListener("submit", function(event) {
    event.preventDefault();
     
     
// Läser sökfrasen och ta bort onödiga mellanslg
const searchTerm = searchInput.value.trim();

// Kollar om sökfältet är tomt
    if (searchTerm === "") {
    errorMessage.textContent = "Du måste skriva ett sökord";
    return;
}
    // Tar bort tidigare felmeddelande
    errorMessage.textContent = "";


// Skriver ut sökfrasen i konsolen
console.log(searchTerm);

});