const authentication = document.getElementById("authentication");
const loginbtn = document.getElementById("loginbtn");
authentication.style.display = "none";
const darkmode = document.getElementById("darkmode");
const registerform = document.querySelector("#registerform");
registerform.style.display = "none";
const loginform = document.querySelector("#loginform");
const registerbtn = document.querySelector("#registerbtn");
const registerusername = document.querySelector("#registerusername");
const registeremail = document.querySelector("#registeremail");
const registerpassword = document.querySelector("#registerpassword");
const registeruserbtn = document.querySelector("#registeruserbtn");
const userexistmsg = document.querySelector("#userexistmsg");
const Crendeitialmsg = document.querySelector("#Crendeitialmsg");
userexistmsg.style.display = "none";
const loginemail = document.querySelector("#loginemail");
const loginpassword = document.querySelector("#loginpassword");
const loginuserbtn = document.querySelector("#loginuserbtn");
let users = JSON.parse(localStorage.getItem("users")) || [];

let logedinuser = JSON.parse(localStorage.getItem("logedinuser")) || [];
function user() {
  users = JSON.parse(localStorage.getItem("users")) || [];
  logedinuser = JSON.parse(localStorage.getItem("logedinuser")) || [];
  registerusername.value = "";
  registeremail.value = "";
  registerpassword.value = "";
  loginemail.value = "";
  loginpassword.value = "";
  logedinuser[0]
    ? (loginbtn.textContent = "Logout")
    : (loginbtn.textContent = "Login");
}
user();

function loginformmsg() {
  Crendeitialmsg.style.display = "flex";
  Crendeitialmsg.textContent = "lets login";
  setTimeout(() => {
    Crendeitialmsg.textContent = "";
  }, 2500);
}

function loginsuccmsg() {
  Crendeitialmsg.style.display = "flex";
  Crendeitialmsg.textContent = "Login Successfully";
  Crendeitialmsg.style.color = "green";
  loginbtn.textContent === "Logout";
  setTimeout(() => {
    Crendeitialmsg.textContent = "";
    authentication.style.display = "none";
  }, 2500);
}

function loginnotsuccmsg() {
  Crendeitialmsg.style.display = "flex";
  Crendeitialmsg.textContent = "wrong credentials";
  Crendeitialmsg.style.color = "red";
  setTimeout(() => {
    Crendeitialmsg.textContent = "";
  }, 2500);
}

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

if (loginbtn.textContent === "Logout") {
  loginbtn.addEventListener("click", () => {
    logedinuser.length = 0;
    localStorage.setItem("logedinuser", JSON.stringify(logedinuser));
    window.scrollTo(0, 0);
    user();
  });
} else {
  loginbtn.addEventListener("click", () => {
    window.scrollTo(0, 0);
    registerform.style.display = "none";
    authentication.style.display = "flex";
    loginformmsg();
    user();
  });
}
registerbtn.addEventListener("click", () => {
  loginform.style.display = "none";
  registerform.style.display = "flex";
});
window.onclick = function (event) {
  if (event.target === authentication) {
    authentication.style.display = "none";
    newslist.style.display = "block";
    loginform.style.display = "flex";
    registerform.style.display = "flex";
  }
};

registeruserbtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    registerusername.value !== "" &&
    registerpassword.value !== "" &&
    registeremail.value !== ""
  ) {
    const userRegisterdetails = {
      _id: registerusername.value + Date.now(),
      registerusername: registerusername.value,
      registeremail: registeremail.value,
      registerpassword: registerpassword.value,
    };

    const useralreadyexist = users.filter(
      (el) => el.registeremail === userRegisterdetails.registeremail
    );
    if (useralreadyexist.length === 0) {
      users.push(userRegisterdetails);
      localStorage.setItem("users", JSON.stringify(users));
      userexistmsg.style.display = "block";
      userexistmsg.style.color = "green";
      userexistmsg.textContent = "Register Successfull";
      setTimeout(() => {
        userexistmsg.style.display = "none";
        registerform.style.display = "none";
        loginform.style.display = "flex";
        loginformmsg();
      }, 2500);
    } else {
      userexistmsg.style.display = "block";
      userexistmsg.style.color = "red";
      userexistmsg.textContent = "Please try different email";
      setTimeout(() => {
        userexistmsg.style.display = "none";
      }, 2000);
    }
    user();
  } else {
    userexistmsg.style.display = "block";
    userexistmsg.style.color = "red";
    userexistmsg.textContent = "Please enter all fileds";
    setTimeout(() => {
      userexistmsg.style.display = "none";
    }, 1500);
  }
});

loginuserbtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (loginpassword.value === "" && loginemail.value === "") {
    Crendeitialmsg.style.display = "flex";
    Crendeitialmsg.textContent = "Please enter all fileds";
    Crendeitialmsg.style.color = "red";
    setTimeout(() => {
      Crendeitialmsg.textContent = "";
    }, 2500);
  } else {
    const userLogindetails = {
      loginemail: loginemail.value,
      loginpassword: loginpassword.value,
    };
    const useralreadyexist = users.filter(
      (el) => el.registeremail === userLogindetails.loginemail
    );
    if (!useralreadyexist.length == 0) {
      if (
        useralreadyexist[0].registerpassword === userLogindetails.loginpassword
      ) {
        localStorage.setItem("logedinuser", JSON.stringify(useralreadyexist));
        location.reload();
        loginsuccmsg();
      } else {
        loginnotsuccmsg();
      }
    } else {
      loginnotsuccmsg();
    }
    user();
  }
});

//===========darkmode============
let justifycontent = JSON.parse(localStorage.getItem("darkmode")) || false;
document.body.style.backgroundColor = justifycontent ? "black" : "white";
document.body.style.color = justifycontent ? "white" : "black";
darkmode.style.justifyContent = justifycontent ? "flex-end" : "flex-start";
darkmode.addEventListener("click", () => {
  justifycontent = !justifycontent;
  document.body.style.backgroundColor = justifycontent ? "black" : "white";
  document.body.style.color = justifycontent ? "white" : "black";
  darkmode.style.justifyContent = justifycontent ? "flex-end" : "flex-start";
  justifycontent
    ? localStorage.setItem("darkmode", true)
    : localStorage.removeItem("darkmode");
});
