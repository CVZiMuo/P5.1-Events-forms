// Array to store the pets in memory
var pets = [];

// Get the form and the list container from the HTML
var form = document.getElementById("pet-form");
var petList = document.getElementById("pet-list");

// Show all the pets on the page
function renderPets() {
  // Empty the list before drawing it again
petList.innerHTML = "";

  // Create one card for each pet
for (var i = 0; i < pets.length; i++) {
    var pet = pets[i];

    var card = document.createElement("div");
    card.className = "pet-card";

    // Add the "sold" class if the pet is sold
    if (pet.sold) {
        card.className = "pet-card sold";
    }

    var img = document.createElement("img");
    img.src = pet.image;
    img.alt = pet.name;

    var name = document.createElement("h3");
    name.textContent = pet.name;

    var description = document.createElement("p");
    description.textContent = pet.description;

    var birthdate = document.createElement("p");
    birthdate.textContent = "Birthdate: " + pet.birthdate;

    var price = document.createElement("p");
    price.textContent = "Price: " + pet.price + " €";

    var code = document.createElement("p");
    code.textContent = "Code: " + pet.code;

    // Put everything inside the card
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(birthdate);
    card.appendChild(price);
    card.appendChild(code);

    // Show the "SOLD" badge if the pet is sold
    if (pet.sold) {
        var badge = document.createElement("span");
        badge.className = "sold-badge";
        badge.textContent = "SOLD";
        card.appendChild(badge);
    }

    // Put the card inside the list
    petList.appendChild(card);
    }
}

// When the form is submitted
form.addEventListener("submit", function (event) {
    // Stop the page from reloading
    event.preventDefault();

    // Get the values from the form
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var image = document.getElementById("image").value;
    var birthdate = document.getElementById("birthdate").value;
    var price = document.getElementById("price").value;
    var code = document.getElementById("code").value;
    var sold = document.getElementById("sold").checked;

    // This variable will be false if there is any error
    var valid = true;

    // Name is required
    if (name === "") {
        document.getElementById("name-error").textContent = "Name is required.";
        valid = false;
    } else {
        document.getElementById("name-error").textContent = "";
    }

  // Image URL is required and must end in .jpg, .jpeg, .png or .gif
    var imageRegex = /^https?:\/\/\S+\.(jpg|jpeg|png|gif)$/i;
    if (!imageRegex.test(image)) {
    document.getElementById("image-error").textContent = "Enter a valid image URL (.jpg, .jpeg, .png or .gif).";
    valid = false;
    } else {
    document.getElementById("image-error").textContent = "";
    }

  // Birthdate is required and cannot be in the future
    var today = new Date();
    if (birthdate === "" || new Date(birthdate) > today) {
    document.getElementById("birthdate-error").textContent = "Enter a birthdate that is not in the future.";
    valid = false;
    } else {
    document.getElementById("birthdate-error").textContent = "";
    }

  // Price must be a number greater than zero
    if (price === "" || Number(price) <= 0) {
    document.getElementById("price-error").textContent = "Price must be greater than zero.";
    valid = false;
    } else {
    document.getElementById("price-error").textContent = "";
    }

  // Pet code must be three letters followed by three numbers
    var codeRegex = /^[A-Za-z]{3}[0-9]{3}$/;
    if (!codeRegex.test(code)) {
        document.getElementById("code-error").textContent = "Format: three letters + three numbers (e.g. CAT123).";
        valid = false;
    } else {
        document.getElementById("code-error").textContent = "";
    }

  // If there is any error, stop here
    if (valid === false) {
        return;
    }

  // Create the pet object and add it to the array
    var pet = {
    name: name,
    description: description,
    image: image,
    birthdate: birthdate,
    price: Number(price),
    code: code.toUpperCase(),
    sold: sold
    };
    pets.push(pet);

  // Show the updated list on the page
    renderPets();

  // Clear the form
    form.reset();
});