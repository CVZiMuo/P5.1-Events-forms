// Array to store the pets in memory
var pets = [];

// Get the form and the list container from the HTML
var form = document.getElementById("pet-form");
var petList = document.getElementById("pet-list");

// When the form is submitted
form.addEventListener("submit", function (event) {
    // Stop the page from reloading
    event.preventDefault();

    // Create a pet object with the values from the form
    var pet = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        image: document.getElementById("image").value,
        birthdate: document.getElementById("birthdate").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        sold: document.getElementById("sold").checked
    };

    // Add the pet to the array
    pets.push(pet);

    // Temporary check: show the array in the console
    console.log(pets);

    // Clear the form
    form.reset();
});