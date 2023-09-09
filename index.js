//---------------------- carousel-start
const carouselImages = [
  "https://media.istockphoto.com/id/1051616786/photo/digital-marketing-businessman-working-with-laptop-computer-tablet-and-smart-phone-modern.jpg?s=612x612&w=0&k=20&c=J2A6-q3RtqbISouQVBgpYtI1Ft9KeVsANUFHgG4Olbc=",
  "https://media.istockphoto.com/id/1071030302/photo/female-inventory-manager-shows-digital-tablet-information-to-a-worker-holding-cardboard-box.jpg?s=612x612&w=0&k=20&c=_PRg90QRTbxUPDljUJEAc9n5WnBG8TkMoEneC554Ag8=",
  "https://media.istockphoto.com/id/1219980553/photo/online-news-on-a-smartphone-and-laptop-woman-reading-news-or-articles-in-a-mobile-phone.jpg?s=612x612&w=0&k=20&c=QodY8pXN5DbLs3-FhwWhhYKnsOE4Iixky_SwdGitwnQ=",
  "https://media.istockphoto.com/id/879598534/photo/woman-shopping-for-clothes-online.jpg?s=612x612&w=0&k=20&c=g-RTo0lmKxZczPTbrrwhD3Kk6WUIxGKCilU67tHuhXk=",
  "https://media.istockphoto.com/id/1177502660/photo/young-woman-reading-the-news-on-a-modern-tablet-computer-while-sitting-in-her-living-room.jpg?s=612x612&w=0&k=20&c=oEfXfMaKkgAVfshd7yk_bxGk2iQncWueLVlTL__gWWg=",
  "https://media.istockphoto.com/id/887987150/photo/blogging-woman-reading-blog.jpg?s=612x612&w=0&k=20&c=7SScR_Y4n7U3k5kBviYm3VwEmW4vmbngDUa0we429GA=",
];
const leftButton = document.getElementById("left");
leftButton.addEventListener("click", () => moveCarousel(-1));

const rightButton = document.getElementById("right");
rightButton.addEventListener("click", () => moveCarousel(1));

let currentIndex = 0;
function moveCarousel(direction) {
  currentIndex =
    (currentIndex + direction + carouselImages.length) % carouselImages.length;
  document.getElementById("cimg").src = carouselImages[currentIndex];
}

function autoSlide() {
  moveCarousel(1);
}
setInterval(autoSlide, 5000);
//---------------------- typing-effects ----------
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
};

// --------------------product fetching --------------------
const api = "https://mock-api-6jin.onrender.com/products";
const listdiv = document.createElement("listproducts");

// wishlist
const wishlist = [];
async function fetchproducts() {
  try {
    const response = await fetch(api);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}
//----------------- skeloton------------------------
function displaySkeletons(val) {
  const listProducts = document.getElementById("listproducts");
  if (val === undefined) {
    for (let i = 0; i < 11; i++) {
      const product = document.createElement("div");
      product.classList.add("skeleton");
      const htmlSkeleton = `
          <div class="skel"></div>
        `;
      product.innerHTML = htmlSkeleton;
      listProducts.appendChild(product);
    }
  } else {
    // Remove all .skeleton elements
    const skeletonElements = document.querySelectorAll(".skeleton");
    // console.log(skeletonElements);
    skeletonElements.forEach((skeleton) => {
      listProducts.removeChild(skeleton);
    });
  }
}

function displayproducts(data) {
  data?.forEach((el) => {
    const product = document.createElement("div");
    product.classList.add("product");
    const htmlproduct = ` <img
  src=${el.thumbnail}
  alt="ecomm" loading="lazy" />
<h3>${el.title.substring(0, 22)}</h3>
<p>
  ${el.description.substring(0, 45) + "..."}
</p>
<h4> ${"Price: " + "$" + el.price}</h4>
<div id="hove">
  <button class="wishlist ${el.id}">Add to Wishlist</button>
</div>
`;
    product.innerHTML = htmlproduct;
    // product.insertAdjacentHTML("afterbegin", htmlproduct);
    document.getElementById("listproducts").appendChild(product);
  });
  const addToWishlistButtons = document.querySelectorAll(".wishlist");
  addToWishlistButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.getAttribute("class").trim().split(" ")[1];
      const productToAdd = data.find((product) => product.id == productId);

      if (productToAdd) {
        try {
          const response = await fetch(
            "https://mock-api-6jin.onrender.com/ebnwishlist",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productToAdd),
            }
          );

          if (response.ok) {
            // If the request was successful, change the button text
            button.textContent = "Added to Wishlist";
            button.disabled = true; // Disable the button to prevent multiple clicks
          } else {
            console.error("Failed to add to wishlist");
          }
        } catch (error) {
          console.error("Error adding to wishlist:", error);
        }
      }
    });
  });
}
async function skelprod() {
  displaySkeletons();
  const data = await fetchproducts();
  if (data) {
    displayproducts(data.slice(data.length - 13, data.length - 1).reverse());
    displaySkeletons("delele");
  }
}
skelprod();

// ====================newssection =================
const newsapi = "https://mock-api-6jin.onrender.com/ebnnews";

function fetchNewsData() {
  return fetch(newsapi)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching news data:", error);
      throw error; 
    });
}

function displayNews() {
  fetchNewsData()
    .then((data) => {
      if (data) {
        data.forEach((el) => {
          const htmlString = `
              <div>
                <img src=${el.img} alt="" />
                <h1>“${el.title.substring(0, 84)}”</h1>
                <span>Date: ${el.date}</span>
                <p>${el.description.substring(0, 160)}...</p>
              </div>
            `;
          document
            .getElementById("newslist")
            .insertAdjacentHTML("beforeend", htmlString);
        });
      } else {
        console.log("No news data available.");
      }
    })
    .catch((error) => {
      console.error("Error displaying news data:", error);
    });
}

displayNews();


const arrowup = document.querySelector("#arrow_up");
arrowup.addEventListener("click", () => {
  window.scrollTo(0, 0);
});


