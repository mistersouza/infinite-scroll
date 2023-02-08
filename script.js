const imagesContainer = document.querySelector('.images-container');
const loader = document.querySelector('.loader');

let isPageLoaded = false;
let imagesLoaded = 0; // keep track of images loaded
let imagesCount = 0;  
let images = [];
let isInitialLoad = true;

const count = 5

// Unsplash API
UNSPLASH_ACCESS_KEY = 'iCyUN-9Q6zmdw-PY4w6oXIYOUQ3zFge972LKkgYEpko'

const BASE_URL= `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_ACCESS_KEY}&count=${count}`;

function updateAPICount(NewCount) {
  BASE_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_ACCESS_KEY}&count=${NewCount}`;
}

// Check if all images are loaded
function isImageLoaded() {
    imagesLoaded++;

    if (imagesLoaded === imagesCount) {
        isPageLoaded = true;
        loader.hidden = true;

    }
}


function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, Add to DOM
function showImages() {
    imagesLoaded = 0;
    imagesCount = images.length;
    console.log('Total images: ', imagesCount);

    images.forEach(img => {
        // Create links to Unsplash
        const link = document.createElement('a');
        setAttributes(link, {
          href: img.links.html,
          target: '_blank'
        });

        // Create <img>
        const image = document.createElement('img');
        setAttributes(image, {
          src: img.urls.regular,
          alt: img.description,
          title: img.description
        });

        // event listener, check when each is finished loading
        image.addEventListener('load', isImageLoaded);

        // Add elements to DOM
        link.appendChild(image);
        imagesContainer.appendChild(link);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
  
  try {
    const response = await fetch(BASE_URL);
    images = await response.json();
    showImages();
    if (isInitialLoad) {
      updateAPICount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isPageLoaded) {
    isPageLoaded = false;
    getPhotos();
  }
})

// On Load
getPhotos();