
function PhotoData(name, altText, dateTaken, camera) {
  this.name = name;
  this.altText = altText;
  this.dateTaken = dateTaken;
  this.camera = camera;
}

const ALL_PHOTOS = [
  new PhotoData("Photo Name", "A centered sunset over the ocean", "date", "cameraaa"),
  new PhotoData("Photo Name", "A crackling campfire at night", "date", "cameraaa"),
  new PhotoData("Photo Name", "A dreary river with foggy trees behind", "date", "cameraaa"),
  new PhotoData("Photo Name", "Many leaves filling the screen", "date", "cameraaa"),
  new PhotoData("Photo Name", "A single small focused red rock atop a larger stone", "date", "cameraaa"),
  new PhotoData("Photo Name", "Five-pointed magneta flowers on a branch", "date", "cameraaa"),
  new PhotoData("Photo Name", "A focused, close up pink flower, with the stamen visible in the sunlight", "date", "cameraaa"),
  new PhotoData("Photo Name", "A very large five-petaled pink flower", "date", "cameraaa"),
  new PhotoData("Photo Name", "Many yellow flowers in a bunch, in front of shrubery", "date", "cameraaa"),
  new PhotoData("Photo Name", "A focused large pinecone on a rock", "date", "cameraaa"),
  new PhotoData("Photo Name", "A foggy snowy mountain framed by grey clouds", "date", "cameraaa"),
  new PhotoData("Photo Name", "A snowy mountain within a blue sky and trees", "date", "cameraaa"),
  new PhotoData("Photo Name", "An ariel photo of a craggy rock face", "date", "cameraaa"),
  new PhotoData("Photo Name", "Bright, pink, four-petaled flowers", "date", "cameraaa"),
  new PhotoData("Photo Name", "Large rectangles of ivy on a terraced concrete sturcture", "date", "cameraaa"),
  new PhotoData("Photo Name", "A small, pink flower on a sunny day", "date", "cameraaa"),
  new PhotoData("Photo Name", "A closeup photo of dew drops on a leaf", "date", "cameraaa"),
  new PhotoData("Photo Name", "A downwards photo of a rushing river", "date", "cameraaa"),
  new PhotoData("Photo Name", "A photo outlooking a valley of trees below", "date", "cameraaa"),
  new PhotoData("Photo Name", "Two small purple photos with drops of dew on them", "date", "cameraaa"),
  new PhotoData("Photo Name", "Two snails, with interesting, white and amber shells, on a tree", "date", "cameraaa"),
  new PhotoData("Photo Name", "A pelican-looking bird in water with an angry look", "date", "cameraaa"),
  new PhotoData("Photo Name", "Sunset-orange cloud in the a blue sky", "date", "cameraaa"),
  new PhotoData("Photo Name", "A deep blue river, framed by bushes and red-orange rock", "date", "cameraaa"),
  new PhotoData("Photo Name", "Small pink flowers with large green leaves", "date", "cameraaa"),
  new PhotoData("Photo Name", "A field of bright yellow daffodils", "date", "cameraaa"),
  new PhotoData("Photo Name", "A Bunch of small purple flowers", "date", "cameraaa"),
  new PhotoData("Photo Name", "Assorted blue, purple and pink flowers, interspersed randomly", "date", "cameraaa"),
  new PhotoData("Photo Name", "A closeup photo of a yellow tulip", "date", "cameraaa"),
  new PhotoData("Photo Name", "Two trees, with ocean waves in the background", "date", "cameraaa"),
  new PhotoData("Photo Name", "A long gravel path ending at the horizon, sorrounded by ocean", "date", "cameraaa"),
  new PhotoData("Photo Name", "A leaf with many holes eaten in it", "date", "cameraaa"),
  new PhotoData("Photo Name", "A black and white small concrete star", "date", "cameraaa"),
  new PhotoData("Photo Name", "A yellow flower surrounded by pink leaves", "date", "cameraaa"),
];

ALL_PHOTOS.forEach((e, i) => {
  let ele = document.createElement('img');
  ele.src = `/assets/photos/photo${String(i).padStart(2, '0')}.webp`
  ele.alt = e.altText;
  document.getElementById('photo-wrapper').append(ele);
})

// Add eventlistener to each photo
document.getElementById("photo-wrapper").childNodes.forEach((e) => {
  if (e.nodeName === "IMG") {
    e.addEventListener("click", () => {large(e)}, false);
  }
})

// Make large img current photo, then show container
function large(node) {
  document.getElementById("large").src = node.src;
  document.getElementById("large-wrapper").style.display = "flex";
}