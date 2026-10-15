"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Jeanette Söderman
 */

// Hämtar formulär och sökfält från Html
const form = document.querySelector("#searchform");

// Hämtar sökfältet där användaren skriver sökfrasen 
const searchInput = document.querySelector("#search");

// Här visas felmeddelande om sökfältet är tomt
const errorMessage = document.querySelector("#error");

// Hämtar sektionen där receptet ska visas
const recipeContainer = document.querySelector("#recipe");

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

// Anropar funktionen som hämtar recept
fetchRecipes(searchTerm);

});

// Hämar recept från API:et
async function fetchRecipes(searchTerm) {
    const url = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm)}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    // Hämtar det första receptet
    const firstRecipe = data.recipes[0];

    console.log(firstRecipe);
    console.log(firstRecipe.name);

    // Tar bort tidigare recept
    recipeContainer.innerHTML = "";

    // Skapar en ruta som ska innehålla hela receptet
    const recipeArticle = document.createElement("article");

    // Skapar en ny h3 
    const recipeTitle = document.createElement("h3");

    // Lägger till receptets namn i rubriken h3
    recipeTitle.textContent = firstRecipe.name;

    // Skapar en bild till receptet
    const recipeImage = document.createElement("img");

    //Hämtar bildens adress freån receptet
    recipeImage.src = firstRecipe.image;

    // Ger bilden en beskrivande text
    recipeImage.alt = firstRecipe.name;

    // Lägger bilden under rubriken
    recipeArticle.appendChild(recipeImage);

    // Lägger till h3:an i recepts article
    recipeArticle.appendChild(recipeTitle);

    // Lägger till hela receptet i receptsektionen
    recipeContainer.appendChild(recipeArticle);
}