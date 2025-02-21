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