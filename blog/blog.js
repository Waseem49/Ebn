const nav = document.querySelector("#nav");
const text = document.querySelector("#text");
let scrollhua = 0;
window.addEventListener("scroll", function scrollval() {
  scrollhua = window.scrollY;
  if (scrollhua > 5) {
    nav.classList.add("nav");
  } else if (scrollhua < 5) {
    nav.classList.remove("nav");
  }
});
