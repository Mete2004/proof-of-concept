const mainImage = document.querySelector(".main-image");
const thumbnails = document.querySelectorAll(".thumbnails a");

const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");

let currentIndex = 0;

// map: bewaard alleen de href van alle thumbnails
const imageUrls = Array.from(thumbnails).map((thumbnail) => thumbnail.href);

function updateGallery() {
    mainImage.src = imageUrls[currentIndex];

    thumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove("active");
    });

    thumbnails[currentIndex].classList.add("active");
}

nextButton.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= imageUrls.length) {
        currentIndex = 0;
    }
    // werkt de grote afbeelding en actieve thumbnail bij
    updateGallery();
});


previousButton.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = imageUrls.length - 1;
    }
    
    updateGallery();
});

//index: onthoud welke nummer het is
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", (event) => {
        event.preventDefault();
        //vervangt de main image door het geklikte thumbnail
        mainImage.src = thumbnail.href;
        currentIndex = index;

        thumbnails.forEach((thumbnail) => {
            thumbnail.classList.remove("active");
        });

        thumbnail.classList.add("active");
    });
});

setInterval(() => {
    currentIndex++;

    if (currentIndex >= imageUrls.length) {
        currentIndex = 0;
    }

    updateGallery();
}, 4000);