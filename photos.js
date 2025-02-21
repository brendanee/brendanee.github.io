document.getElementById("photo-wrapper").childNodes.forEach((e) => {
  if (e.nodeName === "IMG") {
    e.addEventListener("click", () => {large(e)}, false);
  }
})

function large(node) {
  document.getElementById("large").src = node.src;
  document.getElementById("large-wrapper").style.display = "flex";
}