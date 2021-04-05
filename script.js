//Unsplash api
const count = 10;
const apikey = 'BPe4ZBUekFrXQouMnjsQiV-_iNm_SHqryjHviR_rIZ0'; 
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;
let imgContainer = document.getElementById('img-container');
let photosArray = [];

//Helper function to set attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links & photos, add to dom
function displayPhotos() {
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
    }catch(err) {
        //Catch error here
    }
}
//On Load
getPhotos();