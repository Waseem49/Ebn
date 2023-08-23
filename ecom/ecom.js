// ===================data-fatching =================
const api = "https://mock-api-6jin.onrender.com/products";

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

const displayProducts = async () => {
  const data = await fetchproducts();
  if (data) {
    const product_list = document.querySelector("#product_list");
    data.forEach((el) => {
      // console.log(el);
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
};
displayProducts();
