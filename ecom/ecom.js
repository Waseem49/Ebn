// ===================data-fatching =================
const api = "https://mock-api-6jin.onrender.com/products";
const product_list = document.querySelector("#product_list");
// ---------Paginations--------------------------------
const prevbtn = document.querySelector("#prevbtn");
const page = document.querySelector("#page");
const nextbtn = document.querySelector("#nextbtn");
const productsPerPage = 9;
//---------Sorting--------------------------------
const lowttohigh = document.querySelector("#lth");
const hightolow = document.querySelector("#htl");
//----------clear--------------------------------
const clearbtn = document.querySelector("#span");

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
    let data = [...json];

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
            <button>Add to Cart</button>
            <button>Buy Now </button> 
          </div>
        </div>`;
      product_list.insertAdjacentHTML("beforeend", product);
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
  lowttohigh.Checked = false;
  fetchproducts();
});
