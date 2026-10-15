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

// Här visas ett meddelande om ett recept inte hittas
const message = document.querySelector("#message");

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
    try {
    const url = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm)}`;

    const response = await fetch(url);

    // Kolar om servern svarar som den ska
    if (!response.ok) {
        throw new Error("Could not fetch recipes");
    }

    const data = await response.json();

    // Tar bort tidigare meddelanden
    message.textContent = "";

    // Kollar om sökningen gav några recept
    if (data.recipes.length === 0) {
        recipeContainer.innerHTML = "";
        message.textContent = "No recipes to be found. Try another search";
        return;
    }

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

    // Skapar en ruta för information om eceptet
    const recipeInfo = document.createElement("div");

    // Rutan får samma klass som i cssfilen
    recipeInfo.className = "recipe-info";

    // Visar antalet portioner
    const servings = document.createElement("p");

    // Hämtar antalet portioner från receptet
    servings.textContent = `Servings: ${firstRecipe.servings}`;

    // Lägger in texten i inforutan
    recipeInfo.appendChild(servings);

    // Här visas förberedelsetiden
    const prepTime = document.createElement("p");

    // Hämtar förberedelsetiden från receptet
    prepTime.textContent = `Preparation time: ${firstRecipe.prepTimeMinutes} minutes`;

    // Lägger till tiden i inforutan
    recipeInfo.appendChild(prepTime);

    // Här visas tillagningstiden
    const cookTime = document.createElement("p");

    // Hämtar tillagningstiden från receptet
    cookTime.textContent = `Cooking time: ${firstRecipe.cookTimeMinutes} minutes`;

    // Lägger till tiden i inforutan
    recipeInfo.appendChild(cookTime);

    // Här visas svårighetsgraden
    const difficulty = document.createElement("p");

    // Hämtar svårighetsgraden från receptet
    difficulty.textContent = `Difficulty: ${firstRecipe.difficulty}`;

    // Lägger till svårighetsgraden i inforutan
    recipeInfo.appendChild(difficulty);
    

    // Lägger informationen i receptet
    recipeArticle.appendChild(recipeInfo);

    // Skapar en rubrik för ingredienser
    const ingredientsTitle = document.createElement("h4");

    // Lägger till texten i rubriken
    ingredientsTitle.textContent = "Ingredients";

    // Lägger till h4:an i receptet
    recipeArticle.appendChild(ingredientsTitle);

    // Skapar en lista med ingredienser
    const IngredientsList = document.createElement("ul");

        // Går igenom alla ingredienser
        firstRecipe.ingredients.forEach(function(ingredient) {

            // Skapar en rad för ingrediensen
            const listItem = document.createElement("li");

            // Lägger till ingrediensens namn
            listItem.textContent = ingredient;

            // Lägger till i listan
            IngredientsList.appendChild(listItem);
        });

        // Lägger till ingredienslistan i receptet
        recipeArticle.appendChild(IngredientsList);

        // Skapar en rubrik för instruktioner
        const instructionsTitle = document.createElement("h4");

        // Lägger till texten i rubriken
        instructionsTitle.textContent = "Instructions";

        // Lägger till h4:an i receptet
        recipeArticle.appendChild(instructionsTitle);

        // Skapar en numrerad lista med instruktioner
        const instructionsList = document.createElement("ol");

            // Går igenom alla instruktioner
            firstRecipe.instructions.forEach(function(instructions) {

                // Skapar en rad för instruktion
                const instructionList = document.createElement("li");

                // Lägger till instruktionens namn
                instructionList.textContent = instructions;

                // Lägger till i listan
                instructionsList.appendChild(instructionList);
            });

            // Lägger till listan med instruktiuoner i receptet
            recipeArticle.appendChild(instructionsList);


    // Lägger till hela receptet i receptsektionen
    recipeContainer.appendChild(recipeArticle);
        } catch (error) {

            // Tar bort receptet om något strular
            recipeContainer.innerHTML = "";

            // Visar ett meddelande om något strular
            message.textContent = " Something went wrong. Try again.";

            // Visar felet i konsolen
            console.error(error);
        }
}