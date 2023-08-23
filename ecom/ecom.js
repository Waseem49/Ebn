// ===================data-fatching =================
const api = "https://mock-api-6jin.onrender.com/products";
const product_list = document.querySelector("#product_list");
const prevbtn = document.querySelector("#prevbtn");
const page = document.querySelector("#page");
const nextbtn = document.querySelector("#nextbtn");
let currentPage = 1;
const productsPerPage = 9;

async function fetchproducts() {
  try {
    const response = await fetch(api);
    const json = await response.json();
    displayProducts(json);
    return json;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}
// fetchproducts();

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
      product_list.insertAdjacentHTML("afterbegin", product);
    });
  }
}

const updatePaginationButtons = (totalPages) => {
  prevbtn.disabled = currentPage === 1;
  nextbtn.disabled = currentPage === totalPages;
  page.textContent = currentPage;
};

const handlePagination = async () => {
  const data = await fetchproducts();
  const totalPages = Math.ceil(data.length / productsPerPage);
  updatePaginationButtons(totalPages);

  prevbtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayProducts(
        data.slice(
          (currentPage - 1) * productsPerPage,
          currentPage * productsPerPage
        )
      );
      updatePaginationButtons(totalPages);
    }
  });

  nextbtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts(
        data.slice(
          (currentPage - 1) * productsPerPage,
          currentPage * productsPerPage
        )
      );
      updatePaginationButtons(totalPages);
    }
  });

  // Initially, display the first page of products
  displayProducts(data.slice(0, productsPerPage));
};

handlePagination();
