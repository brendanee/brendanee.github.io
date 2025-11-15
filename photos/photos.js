
function PhotoData(name, altText, dateTaken, camera) {
  this.name = name;
  this.altText = altText;
  this.dateTaken = dateTaken;
  this.camera = camera;
}

const ALL_PHOTOS = [
  new PhotoData("Rocks & Shells", "Three white shells and a rock upon a stump", "September 18th, 2025", "Canon EOS Rebel T7"),
  new PhotoData("Sea Sunset", "A centered sunset over the ocean", "May 28th, 2024", "NIKON COOLPIX AW110"),
  new PhotoData("Smoky Smell", "Overhead of a crackling campfire in darkness", "May 31st, 2024", "NIKON COOLPIX AW110"),
  new PhotoData("Foggy Day", "A dreary river with trees and dense fog behind", "June 1st, 2024", "NIKON COOLPIX AW110"),
  new PhotoData("Heart Leaves", "Many, many heart-shaped leaves filling the screen", "May 10th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Red Rock", "A small, singlular, focused red volcanic rock atop a smooth grey stone", "June 24th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Star Flowers", "Several five-pointed magenta flowers on a lime green branch", "June 25th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Small Pink Flower", "A focused, close up pink flower, with the stamen visible in the sunlight", "June 25th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Large Flower", "A very large five-petaled pink flower", "June 25th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Yellow Flowers", "Many yellow flowers in a bunch, in front of shrubbery", "July 25th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Pinecone", "A focused large pinecone on a rock", "July 20th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Red Bug", "A white-spotted red bug upon a grey hat overlooking water", "July 19th, 2025", "iPhone 14"),
  new PhotoData("Cloud Mountain", "A snowy mountain within a blue sky and trees", "August 11th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Rock Face", "An ariel photo of a craggy rock face", "August 11th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Three Pink Flowers", "Three bright pink four-petaled flowers", "August 11th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Ivy Lines", "Large rectangles of ivy on a terraced concrete structure", "May 31st, 2023", "NIKON COOLPIX AW110"),
  new PhotoData("Five Petaled Pink Flower", "A small, five-petaled pink flower, on a sunny day", "June 2nd, 2023", "NIKON COOLPIX AW110"),
  new PhotoData("Dew Drops", "A closeup of dew drops on a green leaf", "June 2nd, 2023", "NIKON COOLPIX AW110"),
  new PhotoData("River Rapids", "A downwards photo of white rushing river rapids", "June 4th, 2023", "NIKON COOLPIX AW110"),
  new PhotoData("Trees & Valley", " Trees framing shrubbery overlooking a faraway forest and river", "June 5th, 2023", "NIKON COOLPIX AW110"),
  new PhotoData("Purple Dew Flowers", "Two small purple flowers with drops of dew hanging on them", "January 20th, 2025", "NIKON COOLPIX AW110"),
  new PhotoData("Two Snails", "Two spiral-shelled, white and amber snails attached to a tree", "January 20th, 2025", "NIKON COOLPIX AW110"),
  new PhotoData("Pelican", "A pelican-type bird in dark water with an angry look", "January 23rd, 2025", "NIKON COOLPIX AW110"),
  new PhotoData("Cloudy Sunset", "A sunset-orange cloud in the a blue sky", "September 4th, 2022", "iPhone SE (2nd gen)"),
  new PhotoData("Blue River, Red Rocks", "A deep blue, slow-moving river, framed by bushes and red-orange rock", "September 22nd, 2022", "iPhone SE (2nd gen)"),
  new PhotoData("Peeking Red Flower", "Small red bunches of flowers peeking through large leaves", "April 3rd, 2024", "iPhone 14"),
  new PhotoData("Daffodils", "A field of bright yellow daffodils", "April 3rd, 2024", "iPhone 14"),
  new PhotoData("Purple Flowers", "A bunch of small purple flowers", "April 3rd, 2024", "iPhone 14"),
  new PhotoData("Assorted Flowers", "Assorted blue, purple and pink flowers, interspersed randomly", "April 3rd, 2024", "iPhone 14"),
  new PhotoData("Tulips", "A closeup photo of a yellow & magenta tulips", "April 3rd, 2024", "iPhone 14"),
  new PhotoData("Ocean Waves", "Grass and two pine trees, framing faraway ocean waves", "July 16th, 2024", "iPhone 14"),
  new PhotoData("The Gravel Road", "A long gravel path extending to the horizon, surrounded by ocean", "July 17th, 2024", "iPhone 14"),
  new PhotoData("Leaf with Hole", "A close-up of a leaf with several holes eaten in it", "November 14th, 2022", "iPhone SE (2nd gen)"),
  new PhotoData("Stone Star", "A black and white small concrete engraved star", "September 14th, 2022", "iPhone SE (2nd gen)"),
  new PhotoData("Yellow & Pink", "A small, dewey yellow flower framed by pink leaves", "October 25th, 2022", "iPhone SE (2nd gen)"),
  new PhotoData("Sand Delta", 'Sand and water inetsecting, framed by trees & sky', 'September 18th, 2025', 'Canon EOS Rebel T7'),
  new PhotoData("Metal Hook", 'A close-up of a metal hook & rope hung on a timber pole', 'September 18th, 2025', 'Canon EOS Rebel T7'),
  new PhotoData("Dead Yellow Flower", 'Bunches of yellow flowers with a single one dead, rusing above the others, on a blue sky', 'September 18th, 2025', 'Canon EOS Rebel T7'),
  new PhotoData("Pink & White Flower", 'A close-up of a flower with a white center and dark pink outside', 'July 31st, 2025', 'iPhone 14'),
  new PhotoData("Two Lavender Flowers", 'Two tiny lavender flowers on thin stems against a blue sky', 'September 18th, 2025', 'Canon EOS Rebel T7'),
  new PhotoData("Barn & Grass", 'A grey barn in a grassy field with a white fence', 'July 14th, 2025', 'iPhone 14'),
  new PhotoData("Four Pink Flowers", "Top-down of four bright pink flowers on large green leaves", "July 18th, 2025", "iPhone 14"),
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