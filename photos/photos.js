
function PhotoData(name, altText, dateTaken, camera) {
  this.name = name;
  this.altText = altText;
  this.dateTaken = dateTaken;
  this.camera = camera;
}

/*
Batch Image Settings
Watermark Pi: 60% transparent
Lowres: Long Edge 500px, WebP Quality 70, Pi 4% Scale
Highres: Long Edge 1920px WebP Quality 80, Pi 15% scale
*/




const ALL_PHOTOS = [
new PhotoData("Yellow & Pink", "A closeup of a small, dew-dropped yellow flower backgrounded by pink leaves", "October 25th, 2022", "iPhone SE (2nd gen)"),
new PhotoData("Smoky Smell", "Overhead of a crackling campfire in darkness", "May 31st, 2024", "NIKON COOLPIX AW110"),
new PhotoData("Foggy Day", "A dreary river with trees and dense fog behind", "June 1st, 2024", "NIKON COOLPIX AW110"),
new PhotoData("Angular Building", "A up-looking shot of a tall grey building with many leading lines, on a blue sky", "February 9th, 2026", "NIKON COOLPIX AW110"),
new PhotoData("Wooden House & Roof", "Wooden house & balcony, with black roofing visible", "February 9th, 2026", "NIKON COOLPIX AW110"),
new PhotoData("Red Temple", "Looking up on a temple's red wood, black roofing, and a blue sky", "February 10th, 2026", "NIKON COOLPIX AW110"),
new PhotoData("Roofing", "Wide shot of various Japanese houses' roofs", "February 10th, 2026", "NIKON COOLPIX AW110"),
new PhotoData("Rainbow Cranes", "Close-up of many multicolored cranes strung together", "February 13th, 2026", "NIKON COOLPIX AW110"),
new PhotoData("Red Rock", "A small, singlular, focused red volcanic rock atop a smooth grey stone", "June 24th, 2022", "NIKON COOLPIX AW110"),
new PhotoData("Star Flowers", "Several thin-petaled five-pointed magenta flowers on a lime green branch", "June 25th, 2022", "NIKON COOLPIX AW110"),
new PhotoData("Large Flower", "A very large five-petaled pink flower", "June 25th, 2022", "NIKON COOLPIX AW110"),
new PhotoData("Pinecone", "A large pinecone on a light grey rock", "July 20th, 2022", "NIKON COOLPIX AW110"),
new PhotoData("Cloud Mountain", "A snowy mountain top within a blue sky and trees, broken by clouds", "August 11th, 2022", "NIKON COOLPIX AW110"),
new PhotoData("Rock Face", "An ariel photo of a craggy sunlight grey rock face", "August 11th, 2022", "NIKON COOLPIX AW110"),
new PhotoData("Pink Flowers", "A closeup on four bright pink four-petaled flowers", "August 11th, 2022", "NIKON COOLPIX AW110"),
new PhotoData("Dew Drops", "A closeup of large dew drops on a green leaf", "June 2nd, 2023", "NIKON COOLPIX AW110"),
new PhotoData("River Rapids", "A downwards-looking photo of white rushing river rapids", "June 4th, 2023", "NIKON COOLPIX AW110"),
new PhotoData("Purple Dew Flowers", "Two small purple flowers with drops of dew hanging on them, surrounded by green leaves", "January 20th, 2025", "NIKON COOLPIX AW110"),
new PhotoData("Two Snails", "Two spiral-shelled, white and amber snails attached to a tree", "January 20th, 2025", "NIKON COOLPIX AW110"),
new PhotoData("Pelican", "A pelican-type bird in dark water with an orange beak and angry look", "January 23rd, 2025", "NIKON COOLPIX AW110"),
new PhotoData("Stone Star", "A black and white small concrete engraved star on polished stone", "September 14th, 2022", "iPhone SE (2nd gen)"),
new PhotoData("Metal Hook", 'A close-up of a metal hook & rope hung on a timber pole, the sky behind', 'September 18th, 2025', 'Canon EOS Rebel T7'),
new PhotoData("Wilted  Yellow Flower", 'Bunches of yellow flowers with a single one wilted and brown, rising above the others', 'September 18th, 2025', 'Canon EOS Rebel T7'),
new PhotoData("Rocks & Shells", "Three bright white shells and a rock upon a stump", "September 18th, 2025", "Canon EOS Rebel T7"),
new PhotoData("Two Lavender Flowers", 'Two tiny lavender flowers on thin green stems against a blue sky', 'September 18th, 2025', 'Canon EOS Rebel T7'),
new PhotoData("Blue River, Red Rocks", "A deep blue, slow-moving river, framed by trees and red-orange rock", "September 22nd, 2022", "iPhone SE (2nd gen)"),
new PhotoData("Daffodils", "A field of bright yellow daffodils", "April 3rd, 2024", "iPhone 14"),
new PhotoData("Tulips", "A closeup photo of a yellow, magenta, & pink tulips", "April 3rd, 2024", "iPhone 14"),
new PhotoData("Ocean Waves", "Distant bright ocean waves framed by green grass and two pine trees", "July 16th, 2024", "iPhone 14"),
new PhotoData("Barn & Grass", 'A grey barn in a grassy field with a white fence and cloudy blue sky', 'July 14th, 2025', 'iPhone 14'),
new PhotoData("Red Bug", "A white-spotted red & black bug upon grey fabric overlooking water", "July 19th, 2025", "iPhone 14"),
new PhotoData("Pink & White Rose", 'A close-up of a rose with a white center rimmed with deep pink', 'July 31st, 2025', 'iPhone 14'),
new PhotoData("Gravel Pathway", "A long, flat gravel path extending to the horizon, framed by ocean on both sides", "July 17th, 2024", "iPhone 14"),
new PhotoData("Hole-punched Leaf", "A close-up of a light-green leaf with several holes eaten into it", "November 14th, 2022", "iPhone SE (2nd gen)"),
new PhotoData("Single Pink Tulip", "A single, focused, pink tulip on front of green stems unsprouted", "April 7th, 2026", "NIKON D90"),
new PhotoData("Yellow & Red", "A yellow tulip amidst several bright red ones, with green stems", "April 7th, 2026", "NIKON D90"),
new PhotoData("Brown-spotted Pink Tulip", "A close-up of a pink tulip, adorned with brown spots", "April 7th, 2026", "NIKON D90"),
new PhotoData("Dew-dropped Grass", "A close-up of a field of thick grass, one focused with a drop of water", "April 7th, 2026", "NIKON D90"),
];

ALL_PHOTOS.forEach((e, i) => e.id = i);

for (let i = 0; i < ALL_PHOTOS.length; i++) {
  const RAND = Math.floor(Math.random() * ALL_PHOTOS.length);
  [ALL_PHOTOS[i], ALL_PHOTOS[RAND]] = [ALL_PHOTOS[RAND], ALL_PHOTOS[i]];
}

ALL_PHOTOS.forEach((e, i) => {
  let ele = document.createElement('img');
  ele.src = `/assets/lowres/photo${String(e.id).padStart(2, '0')}.webp`;
  ele.alt = e.altText;
  ele.addEventListener('click', () => {large(e.id, i)}, false);
  document.getElementById('photo-wrapper').append(ele);
})

// Make large img current photo, then show container
function large(i, id) {
  const PHOTO = ALL_PHOTOS[id];
  document.getElementById("large-photo").src = `/assets/highres/photo${String(i).padStart(2, '0')}.webp`;
  let bodyText = `
  <h1>${PHOTO.name}</h1>
  <i>${PHOTO.altText}.</i><br><br>
  Taken ${PHOTO.dateTaken}, `;
  if ("aeiou".includes(PHOTO.camera.substring(0, 1).toLowerCase())) {
    bodyText += `with an ${PHOTO.camera}.`;
  } else {
    bodyText += `with a ${PHOTO.camera}.`;
  }
  document.getElementById('large-info').innerHTML = bodyText;
  document.getElementById("large-wrapper").style.display = "";
}