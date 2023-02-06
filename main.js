var gallery = document.getElementById("work");
var more = document.getElementById("more");

function expand() {
	if (gallery.classList.contains("work-anim")) {
		gallery.classList.remove("work-anim");
		more.innerHTML = "<br>Show More";

	} else {
		gallery.classList.add("work-anim");
		more.innerHTML = "<br>Show Less";

	}
}