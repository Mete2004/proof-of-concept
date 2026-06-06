const mainImage = document.querySelector(".main-image");
const thumbnails = document.querySelectorAll(".thumbnails a");

const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");

let currentIndex = 0;

// map: bewaard alleen de href van alle thumbnails
const imageUrls = Array.from(thumbnails).map((thumbnail) => thumbnail.href);

nextButton.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= imageUrls.length) {
        currentIndex = 0;
    }

    mainImage.src = imageUrls[currentIndex];
});


previousButton.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = imageUrls.length - 1;
    }

    mainImage.src = imageUrls[currentIndex];
});

// main image wordt vervangen door het geklikte thumbnail
thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", (event) => {
        event.preventDefault();
        mainImage.src = thumbnail.href;
    });
});