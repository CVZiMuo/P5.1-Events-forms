// Array to store the pets in memory
var pets = [];

// Get the form and the list container from the HTML
var form = document.getElementById("pet-form");
var petList = document.getElementById("pet-list");

// Show all the pets on the page
function renderPets() {
  // Empty the list before drawing it again
    petList.innerHTML = "";

    // Add one card for each pet
    for (var i = 0; i < pets.length; i++) {
        var pet = pets[i];
        var badge = "";
        var cardClass = "pet-card";

        // If the pet is sold, show the badge and add the "sold" class
        if (pet.sold) {
        badge = '<span class="sold-badge">SOLD</span>';
        cardClass = "pet-card sold";
        }

        petList.innerHTML +=
        '<div class="' + cardClass + '">' +
            '<img src="' + pet.image + '" alt="' + pet.name + '">' +
            '<h3>' + pet.name + '</h3>' +
            '<p>' + pet.description + '</p>' +
            '<p>Birthdate: ' + pet.birthdate + '</p>' +
            '<p>Price: ' + pet.price + ' €</p>' +
            '<p>Code: ' + pet.code + '</p>' +
            badge +
        '</div>';
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