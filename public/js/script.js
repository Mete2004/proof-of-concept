const mainImage = document.querySelector(".main-image");

const mainImageAvif = document.querySelector(
    '.outer-main-image source[type="image/avif"]'
);

const mainImageWebp = document.querySelector(
    '.outer-main-image source[type="image/webp"]'
);

const thumbnails = document.querySelectorAll(".thumbnails a");

const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");

const productGallery = document.querySelector(".product-gallery");

let currentIndex = 0;

// map: bewaard alleen de href van alle thumbnails
// Slaat alle Directus image IDs van de thumbnails op
const imageIds = Array.from(thumbnails).map(
    (thumbnail) => thumbnail.dataset.imageId
);

//update de active thumbnail
function updateActiveThumbnail() {
    thumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove("active");
    });

    thumbnails[currentIndex].classList.add("active");
}

// update de main image en active thumbnails
function updateGallery() {
    const imageId = imageIds[currentIndex];
    // checken of de browser view transition ondersteunt
    if (document.startViewTransition) {
        document.startViewTransition(() => {
            mainImageAvif.srcset =
                `https://fdnd-agency.directus.app/assets/${imageId}?format=avif&width=330,
                https://fdnd-agency.directus.app/assets/${imageId}?format=avif&width=660 2x`;

            mainImageWebp.srcset =
                `https://fdnd-agency.directus.app/assets/${imageId}?format=webp&width=330,
                https://fdnd-agency.directus.app/assets/${imageId}?format=webp&width=660 2x`;

            mainImage.src =
                `https://fdnd-agency.directus.app/assets/${imageId}?width=330`;

            updateActiveThumbnail();
        });
    } else {
        mainImage.src =
            `https://fdnd-agency.directus.app/assets/${imageId}?width=330`;

        updateActiveThumbnail();
    }
}

nextButton.addEventListener("click", () => {
    stopAutoplay();

    currentIndex++;

    if (currentIndex >= imageIds.length) {
        currentIndex = 0;
    }
    // werkt de grote afbeelding en actieve thumbnail bij
    updateGallery();
});


previousButton.addEventListener("click", () => {
    stopAutoplay();

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = imageIds.length - 1;
    }
    
    updateGallery();
});

//index: onthoud welke nummer het is
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", (event) => {
        stopAutoplay();

        event.preventDefault();
        //vervangt de main image door het geklikte thumbnail
        currentIndex = index;
        updateGallery();
    });
});

// start de gallery autoplay
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        currentIndex++;

        if (currentIndex >= imageIds.length) {
            currentIndex = 0;
        }

        updateGallery();
    }, 3000);
}


// stopt de gallery autoplay
function stopAutoplay() {
    clearInterval(autoplayInterval);
}

let autoplayInterval;

startAutoplay();

productGallery.addEventListener("mouseenter", () => {
    stopAutoplay();
});

productGallery.addEventListener("mouseleave", () => {
    startAutoplay();
});

const reviewDescription = document.querySelector("#review-description");
const reviewCharacterCount = document.querySelector(".review-character-count");

reviewDescription.addEventListener("input", () => {
    reviewCharacterCount.textContent = `${reviewDescription.value.length} / 500`;
});

const reviewerName = document.querySelector("#reviewer-name");
const reviewerNameErrorMessage = document.querySelector(".reviewer-name-error-message");

reviewerName.addEventListener("blur", () => {
    if (reviewerName.value.trim() === "") {
        reviewerNameErrorMessage.textContent = "Name is required";
    } else {
        reviewerNameErrorMessage.textContent = "";
    }
});

const reviewDescriptionErrorMessage = document.querySelector(".review-description-error-message");

reviewDescription.addEventListener("blur", () => {
    if (reviewDescription.value.trim() === "") {
        reviewDescriptionErrorMessage.textContent = "Review is required";
    } else {
        reviewDescriptionErrorMessage.textContent = "";
    }
});

const reviewTitle = document.querySelector("#review-title");
const reviewTitleErrorMessage = document.querySelector(".review-title-error-message");

reviewTitle.addEventListener("blur", () => {
    if (reviewTitle.value.trim() === "") {
        reviewTitleErrorMessage.textContent = "Review is required";
    } else {
        reviewTitleErrorMessage.textContent = "";
    }
});


//enhancement: geen refresh tijdens het posten van een reactie
const reviewForm = document.querySelector(".review-form");
const submitReviewButton = document.querySelector(".submit-review-button");

reviewForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitReviewButton.classList.add("loading");

    submitReviewButton.disabled = true;

    const formData = new FormData(reviewForm);

    const reviewData = Object.fromEntries(formData);

    const response = await fetch("/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(reviewData)
    });

    setTimeout(() => {
        submitReviewButton.classList.remove("loading");

        submitReviewButton.classList.add("success");
        submitReviewButton.textContent = "✓ Review submitted";
        reviewForm.reset();
    }, 2000);

    setTimeout(() => {
        submitReviewButton.classList.remove("success");
        submitReviewButton.textContent = "Send review";
        submitReviewButton.disabled = false;
    }, 5200);
});

const sizeOptions = document.querySelectorAll(".size-option");

sizeOptions.forEach((sizeOption) => {
     sizeOption.addEventListener("click", () => {

        sizeOptions.forEach((option) => {
             option.classList.remove("active");
        });

        sizeOption.classList.add("active");
    });
});

const productList = document.querySelector(".product-list");
const scrollIndicatorProgress = document.querySelector(".scroll-indicator-progress");

productList.addEventListener("scroll", () => {

    const scrollPercentage =
        productList.scrollLeft /
        (productList.scrollWidth - productList.clientWidth);

    scrollIndicatorProgress.style.width =
        `${20 + scrollPercentage * 80}%`;
});