// ===================data-fatching =================
const api = "https://mock-api-6jin.onrender.com/products";
const product_list = document.querySelector("#product_list");
// ---------Paginations--------------------------------
const btnpagi = document.querySelector(".btnpagi");
btnpagi.style.display = "none";
const prevbtn = document.querySelector("#prevbtn");
const page = document.querySelector("#page");
const nextbtn = document.querySelector("#nextbtn");
const productsPerPage = 9;
//---------Sorting--------------------------------
const lowttohigh = document.querySelector("#lth");
const hightolow = document.querySelector("#htl");
//----------clear--------------------------------
const clearbtn = document.querySelector("#span");
//-----------CATEGORY--------------------------------
const smartphones = document.querySelector("#smartphones");
const laptops = document.querySelector("#laptops");
const fragrances = document.querySelector("#fragrances");
const skincare = document.querySelector("#skincare");
const groceries = document.querySelector("#groceries");
//--------------pricerange--------------------------------
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const maxPriceValue = document.getElementById("maxPriceValue");

//--------------userauth----------------------------------------------------
let logedinuser = JSON.parse(localStorage.getItem("logedinuser")) || [];
console.log(logedinuser);
//--------------addtocart--------------------------------
let cartitem = JSON.parse(localStorage.getItem("cartitem")) || [];
const cartquantity = document.querySelector("#cartquantity");
const carticon = document.querySelector("#carttbtn");
const cartt = document.querySelector("#cartt");
const emptycart = document.querySelector("#emptycart");
const shadow = document.querySelector("#shadow");
const pricespan = document.getElementById("price");
const checkoutbtn = document.querySelector("#checkoutbtn");

cartitem = cartitem.filter((el) => el?._id === logedinuser[0]?._id);
let price = 0;
function cartPrice() {
  price = cartitem.reduce((acc, el) => {
    return acc + el.price;
  }, 0);
  pricespan.textContent = price;
  return price;
}
let toggle = true;
function hideCart() {
  cartt.style.display = "none";
  shadow.style.display = "none";
  emptycart.style.display = "none";
}
hideCart();

carticon.addEventListener("click", () => {
  if (toggle) {
    cartt.style.display = "block";
    shadow.style.display = "block";
    updateCartDisplay();
  } else {
    hideCart();
  }
  updateEmptyCartDisplay();
  toggle = !toggle;
});

function updateCartDisplay() {
  const cartlist = document.querySelector("#cartlist");
  cartlist.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  cartlist.innerHTML = "";
  // const newcart = cartitem.filter((el) => el._id === logedinuser[0]._id);
  // console.log(cartitem);
  cartitem.forEach((el) => {
    const cartdivinnerhtml = `
      <div>
        <div>s
          <h3>${el.title.substring(0, 18)}</h3>
          <h4>Price: $${el.price}</h4>
        </div>
        <span id="removebtn${el.id}">Remove</span>
        <img src=${el.thumbnail} alt="alt" />
      </div>
    `;
    cartlist.insertAdjacentHTML("afterbegin", cartdivinnerhtml);

    const removefromcart = document.querySelector(`#removebtn${el.id}`);
    removefromcart.addEventListener("click", (e) => {
      e.stopPropagation();
      const cartitemindex = cartitem.indexOf(el);
      cartitem.splice(cartitemindex, 1);
      localStorage.setItem("cartitem", JSON.stringify(cartitem));
      updateCartDisplay();
      updateCartQuantity();
    });
    cartPrice();
  });
}

function updateCartQuantity() {
  if (cartitem.length > 0) {
    cartquantity.textContent = cartitem.length;
    emptycart.style.display = "none";
  } else {
    cartquantity.textContent = "x";
    emptycart.style.display = "block";
  }
  cartPrice();
}

function updateEmptyCartDisplay() {
  if (cartitem.length > 0) {
    emptycart.style.display = "none";
  } else {
    emptycart.style.display = "block";
  }
}
updateEmptyCartDisplay();
updateCartQuantity();

const toast = document.getElementById("toast");
let selectedPrice = 2000;
let selectedCategories = [];

const sortOptions = {
  ASC: "asc",
  DESC: "desc",
  NONE: "none",
};

let currentPage = 1;
let currentSort = sortOptions.NONE;

async function fetchproducts() {
  try {
    const response = await fetch(api);
    const json = await response.json();
    btnpagi.style.display = "flex";
    let data = [...json];

    data = data.filter((product) => product.price <= selectedPrice);

    if (selectedCategories.length > 0) {
      data = data.filter((el) => {
        return selectedCategories.includes(el.category.toLowerCase());
      });
    }

    if (currentSort == sortOptions.ASC) {
      data.sort((a, b) => a.price - b.price);
    } else if (currentSort == sortOptions.DESC) {
      data.sort((a, b) => b.price - a.price);
    }

    const totalPages = Math.ceil(data.length / productsPerPage);
    updatePaginationButtons(totalPages);

    displayProducts(
      data.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      )
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}
fetchproducts();

function updateSelectedCategories(category) {
  const index = selectedCategories.indexOf(category);
  if (index === -1) {
    selectedCategories.push(category);
  } else {
    selectedCategories.splice(index, 1);
  }
  fetchproducts();
}

function displayProducts(data) {
  product_list.innerHTML = "";
  if (data) {
    data.forEach((el) => {
      const product = ` 
        <div class="product">
          <img src=${el.thumbnail} alt="">
          <div class="hove"><p id="desc">${el.description}</p></div>
          <h3>${el.title.substring(0, 25)}</h3>
          <div class="pricespan">
             <span>Price:$${el.price}</span>
             <span>Stoke:${el.stock}</span>
          </div>
          <div class="btn">
          <button id="add-to-cart-${el.id}"></button>
            <button>Buy Now </button> 
          </div>
        </div>`;

      product_list.insertAdjacentHTML("beforeend", product);
      const addtocartbtn = document.querySelector(`#add-to-cart-${el.id}`);
      addtocartbtn.textContent = "Add to Cart";

      addtocartbtn.addEventListener("click", () => {
        const _id = logedinuser[0]?._id;
        // console.log(_id);
        if (!logedinuser.length == 0) {
          const productexist = cartitem.filter((pl) => pl.id === el.id);
          console.log(productexist);
          if (productexist.length === 0) {
            cartitem.push({ ...el, _id });
            cartquantity.textContent = cartitem.length;
            localStorage.setItem("cartitem", JSON.stringify(cartitem));
            showToast();
          } else {
            showToast("added");
          }
        } else {
          showToast("Please login first");
        }
      });
    });
  }
}

const updatePaginationButtons = (totalPages) => {
  prevbtn.disabled = currentPage === 1;
  nextbtn.disabled = currentPage === totalPages;
  page.textContent = currentPage;
};

prevbtn.addEventListener("click", () => {
  currentPage--;
  fetchproducts();
});
nextbtn.addEventListener("click", () => {
  currentPage++;
  fetchproducts();
});

lowttohigh.addEventListener("click", () => {
  currentSort = sortOptions.ASC;
  fetchproducts();
});

hightolow.addEventListener("click", () => {
  currentSort = sortOptions.DESC;
  fetchproducts();
});

clearbtn.addEventListener("click", () => {
  currentSort = sortOptions.NONE;
  lowttohigh.checked = false;
  hightolow.checked = false;
  smartphones.checked = false;
  laptops.checked = false;
  fragrances.checked = false;
  skincare.checked = false;
  groceries.checked = false;
  selectedPrice = 2000;
  selectedCategories = [];
  fetchproducts();
});

smartphones.addEventListener("click", () => {
  updateSelectedCategories(smartphones.getAttribute("name"));
});

laptops.addEventListener("click", () => {
  updateSelectedCategories(laptops.getAttribute("name"));
});

fragrances.addEventListener("click", () => {
  updateSelectedCategories(fragrances.getAttribute("name"));
});

skincare.addEventListener("click", () => {
  updateSelectedCategories(skincare.getAttribute("name"));
});

groceries.addEventListener("click", () => {
  updateSelectedCategories(groceries.getAttribute("name"));
});

priceRange.addEventListener("input", () => {
  selectedPrice = priceRange.value;
  maxPriceValue.textContent = `${selectedPrice}`;
  fetchproducts();
});

function showToast(val) {
  if (val === "added") {
    toast.textContent = "Already in Cart";
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 2000);
  } else if (val === "Please login first") {
    toast.style.display = "block";
    toast.textContent = "Please login first";
    setTimeout(() => {
      toast.style.display = "none";
    }, 2000);
  } else {
    toast.style.display = "block";
    toast.textContent = "Product Added Successfully";
    setTimeout(() => {
      toast.style.display = "none";
    }, 2000);
  }
}

//=============DARKMODE++++++++++++++++
const darkmode = JSON.parse(localStorage.getItem("darkmode")) || false;
document.body.style.backgroundColor = darkmode ? "black" : "white";
document.body.style.color = darkmode ? "white" : "black";
//============DARKMODE-----------------
