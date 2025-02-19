// Image Gallery Script
const images = ["image1.jpg", "image2.jpg", "image3.jpg"]; // Add your images here
let currentIndex = 0;

const galleryImg = document.getElementById("gallery-img");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

// Function to update image
function updateImage() {
    galleryImg.src = images[currentIndex];
}

// Next Image
nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

// Previous Image
prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});

// Initial Image Load
updateImage();
