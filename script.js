//Unsplash api
let initialLoad = true;
let initialCount = 5;
const apikey = 'BPe4ZBUekFrXQouMnjsQiV-_iNm_SHqryjHviR_rIZ0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${initialCount}`;
let imgContainer = document.getElementById('img-container');
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Set image count to 30 after initial load
function updateAPIUrlWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${picCount}`;
}
//Check if all images are loaded
function imageLoadingDone() {
    imagesLoaded ++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}
//Helper function to set attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links & photos, add to dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photos
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create image for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoadingDone);
        // Put <img> inside <a>, then put both inside imgcontainer element
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}
//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(initialLoad) {
            updateAPIUrlWithNewCount(30);
            initialLoad = false;
        }
    }catch(err) {
        //Catch error here
    }
}

//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})
//On Load
getPhotos();