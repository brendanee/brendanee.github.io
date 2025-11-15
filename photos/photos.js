
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
  new PhotoData("Photo Name", "A dreary river with foggy trees behind", "date", "cameraaa"),
  new PhotoData("Photo Name", "Many leaves filling the screen", "date", "cameraaa"),
  new PhotoData("Red Rock", "A small, singlular, focused red volcanic rock atop a smooth grey stone", "June 24th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Photo Name", "Five-pointed magneta flowers on a branch", "date", "cameraaa"),
  new PhotoData("Photo Name", "A focused, close up pink flower, with the stamen visible in the sunlight", "date", "cameraaa"),
  new PhotoData("Large Flower", "A very large five-petaled pink flower", "June 25th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Yellow Flowers", "Many yellow flowers in a bunch, in front of shrubbery", "July 25th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Pinecone", "A focused large pinecone on a rock", "July 20th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Red Bug", "A white-spotted red bug upon a grey hat overlooking water", "July 19th, 2025", "iPhone 14"),
  new PhotoData("Cloud Mountain", "A snowy mountain within a blue sky and trees", "August 11th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Rock Face", "An ariel photo of a craggy rock face", "August 11th, 2022", "NIKON COOLPIX AW110"),
  new PhotoData("Photo Name", "Bright, pink, four-petaled flowers", "date", "cameraaa"),
  new PhotoData("Photo Name", "Large rectangles of ivy on a terraced concrete sturcture", "date", "cameraaa"),
  new PhotoData("Photo Name", "A small, pink flower on a sunny day", "date", "cameraaa"),
  new PhotoData("Dew Drops", "A closeup of dew drops on a green leaf", "June 2nd, 2023", "NIKON COOLPIX AW110"),
  new PhotoData("Photo Name", "A downwards photo of a rushing river", "date", "cameraaa"),
  new PhotoData("Photo Name", "A photo outlooking a valley of trees below", "date", "cameraaa"),
  new PhotoData("Photo Name", "Two small purple photos with drops of dew on them", "date", "cameraaa"),
  new PhotoData("Two Snails", "Two spiral-shelled, white and amber snails attached to a tree", "January 20th, 2025", "NIKON COOLPIX AW110"),
  new PhotoData("Photo Name", "A pelican-looking bird in water with an angry look", "date", "cameraaa"),
  new PhotoData("Cloudy Sunset", "A sunset-orange cloud in the a blue sky", "September 4th, 2022", "iPhone SE (2nd gen)"),
  new PhotoData("Photo Name", "A deep blue river, framed by bushes and red-orange rock", "date", "cameraaa"),
  new PhotoData("Photo Name", "Small pink flowers with large green leaves", "date", "cameraaa"),
  new PhotoData("Daffodils", "A field of bright yellow daffodils", "April 3rd, 2024", "iPhone 14"),
  new PhotoData("Photo Name", "A Bunch of small purple flowers", "date", "cameraaa"),
  new PhotoData("Photo Name", "Assorted blue, purple and pink flowers, interspersed randomly", "date", "cameraaa"),
  new PhotoData("Tulips", "A closeup photo of a yellow & magenta tulips", "April 3rd, 2024", "iPhone 14"),
  new PhotoData("Ocean Waves", "Grass and two pine trees, framing faraway ocean waves", "July 16th, 2024", "iPhone 14"),
  new PhotoData("The Gravel Road", "A long gravel path extending to the horizon, surrounded by ocean", "July 17th, 2024", "iPhone 14"),
  new PhotoData("Photo Name", "A leaf with many holes eaten in it", "date", "cameraaa"),
  new PhotoData("Stone Star", "A black and white small concrete engraved star", "September 14th, 2022", "iPhone SE (2nd gen)"),
  new PhotoData("Photo Name", "A yellow flower surrounded by pink leaves", "date", "cameraaa"),
  new PhotoData("Sand Delta", 'Sand and water inetsecting, framed by trees & sky', 'September 18th, 2025', 'Canon EOS Rebel T7'),
  new PhotoData("Metal Hook", 'A close-up of a metal hook & rope hung on a timber pole', 'September 18th, 2025', 'Canon EOS Rebel T7'),
  new PhotoData("photo name", 'akt', 'date', 'cameraaa'),
  new PhotoData("Pink & White Flower", 'A close-up of a flower with a white center and dark pink outside', 'July 31st, 2025', 'iPhone 14'),
  new PhotoData("photo name", 'akt', 'date', 'cameraaa'),
  new PhotoData("Barn & Grass", 'A grey barn in a grassy field with a white fence', 'July 14th, 2025', 'iPhone 14'),
  new PhotoData("photo name", 'akt', 'date', 'cameraaa')
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
  document.getElementById('large-info').innerHTML = `
  <h1>${PHOTO.name}</h1>
  <i>${PHOTO.altText}.</i><br><br>
  Taken ${PHOTO.dateTaken}, with a(n) ${PHOTO.camera}.
  `;
  document.getElementById("large-wrapper").style.display = "";
}