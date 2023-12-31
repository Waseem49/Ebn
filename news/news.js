const newslist = document.querySelector("#newslist");
const modal = document.getElementById("myModal");
const modalImage = document.getElementById("modal-image");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementsByClassName("close")[0];
const spinner = document.querySelector(".spinner-box");
const configure = document.querySelectorAll(".configure-core");
let pagecount = 1;
let scrollhua = window.scrollY;
//=============DARKMODE++++++++++++++++
const darkmode = JSON.parse(localStorage.getItem("darkmode")) || false;
document.body.style.backgroundColor = darkmode ? "black" : "white";
document.body.style.color = darkmode ? "white" : "black";
configure.forEach((el) => {
  el.style.backgroundColor = darkmode ? "black" : "white";
});

//============DARKMODE-----------------

let newsbody =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque ut veniam laboriosam facilis ducimus voluptatibus minus ex? Eius illum, veniam quia vitae nulla, sapiente non sed adipisci possimus iure recusandae cumque rem, excepturi nisi debitis est neque molestiae provident! A assumenda consequatur autem cum pariatur. Veritatis corporis voluptas blanditiis dolore eveniet ut, natus omnis commodi ipsam eius assumenda itaque labore dolorem totam laborum reiciendis explicabo magni optio quisquam. Esse alias, ipsum odit quibusdam veritatis minima quia autem ex sed libero tenetur dolor totam, magni officiis perspiciatis rerum accusamus. Inventore quasi error quia est obcaecati unde expedita? Laboriosam deleniti at nihil deserunt iure, maxime fuga, quis distinctio repellendus consequuntur suscipit temporibus minima dolor nobis ducimus eaque, possimus eius ullam porro.";
spinner.style.display = "none";
async function getnews() {
  const url = `https://newsi-api.p.rapidapi.com/api/category?category=world&language=en&country=us&sort=top&page=${pagecount}&limit=20`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b2e78afcbamsh9c50e9536ffa1f3p1c737bjsn9abdc7ff3137",
      "X-RapidAPI-Host": "newsi-api.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function shownews() {
  const result = await getnews();
  result?.map((el) => {
    const newsdiv = `
        <div id=${el._id}>
          <img src=${
            el.image
              ? el.image
              : "https://t4.ftcdn.net/jpg/05/62/07/87/360_F_562078740_j9VukIdJatn6IeX0SaraBr0L4BnjjNsp.webp"
          } alt=${el._id} />
          <h1>“${el.title}”</h1>
          <div>
            <span>Date: ${el.publishedAt}</span>
            <span>SourceName: ${el.sourceName}</span>
          </div>
          <p>${
            el.body ? el.body.substring(0, 500) : newsbody.substring(0, 500)
          }...</p>
        </div>
      `;
    newslist.insertAdjacentHTML("afterbegin", newsdiv);
    const neew = document.getElementById(`${el._id}`);
    neew.addEventListener("click", () => {
      modal.innerHTML = "";
      modal.style.display = "block";
      newslist.style.display = "none";
      const modalhtml = `
       <div class="modal-content">
           <span class="close">&times;</span>
           <div id="news">
              <img id="modal-image" src=${
                el.image
                  ? el.image
                  : "https://t4.ftcdn.net/jpg/05/62/07/87/360_F_562078740_j9VukIdJatn6IeX0SaraBr0L4BnjjNsp.webp"
              } alt="" />
              <div>
                <p id="modal-body">${
                  el.body ? el.body : newsbody.substring(0, 500)
                }</p>
              </div>
           </div>
        </div>
        `;
      modal.insertAdjacentHTML("afterbegin", modalhtml);
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        modal.style.display = "none";
        newslist.style.display = "block";
      };
    });
  });
}

function showLoader() {
  spinner.style.display = "flex";
  setTimeout(() => {
    spinner.style.display = "none";
    setTimeout(() => {
      pagecount++;
      shownews();
    }, 300);
  }, 2000);
}
shownews();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 1) {
    showLoader();
  }
});
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    window.scrollTo(0, scrollhua);
    newslist.style.display = "block";
  }
};
