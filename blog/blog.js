const url = "https://mock-api-2fkx.onrender.com/ebnblog";
const nav = document.querySelector("#nav");
const container = document.querySelector(".container");
const addbtn = document.querySelector("#addbtn");
addbtn.style.display = "none";
const logedinuser = JSON.parse(localStorage.getItem("logedinuser")) || [];
if (logedinuser.length > 0) {
  addbtn.style.display = "block";
}
let scrollhua = 0;
window.addEventListener("scroll", function scrollval() {
  scrollhua = window.scrollY;
  if (scrollhua > 5) {
    nav.classList.add("nav");
  } else if (scrollhua < 5) {
    nav.classList.remove("nav");
  }
});

async function getBlog() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.reverse();
  } catch (error) {
    return error;
  }
}

async function Bloglist() {
  const bloglist = await getBlog();
  bloglist?.map((el) => {
    const blog = ` <div class="card" id=${el.id}>
       <div class="card__header">
         <img src=${el.imgurl} alt="card__image"
           class="card__image" width="600">
       </div>
       <div class="card__body">
         <div style="display: flex; justify-content: space-evenly;">
           <h3 class="tag">${el.blogcategory}</h3>
           <h3>
             <h5>${el.bloguser}</h5>
           </h3>
         </div>
         <h4>${el.title.substring(0, 50)}...</h4>
         <p>${el.description.substring(0, 200)}...</p>
       </div>
       </div>`;
    container.insertAdjacentHTML("beforeend", blog);
    const singleblog = document.getElementById(`${el.id}`);
    singleblog.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("blog", JSON.stringify(el));
      window.location.href = "./singleblog.html";
    });
  });
}
Bloglist();
