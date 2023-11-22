const line = document.querySelector("#line");
const text = document.querySelector("#text");
let scrollhua = 0;
window.addEventListener("scroll", scrollval);
function scrollval() {
  scrollhua = window.scrollY;
  line.style.display = "block";
  if (scrollhua > 5) {
    line.classList.add("line");
  } else if (scrollhua < 5) {
    line.classList.remove("line");
  } else if (scrollhua > 400) {
    line.style.display = "none";
  }
}

// line.classList.remove("line");
