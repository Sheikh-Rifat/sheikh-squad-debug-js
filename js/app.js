// fetching api
const loadProducts = () => {
  const url = "https://fakestoreapi.com/products";
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

// calling api function
loadProducts();



// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h4>Rating: <span class="rating"><i class="fas fa-star"></i> ${product.rating.rate} </span> (${product.rating.count})</h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
    updateTotal();
  }
};


// adding products to cart
let count = 0;

const addToCart = (id, price) => {
  
  count = count + 1;

  // updating price
  updatePrice("price", price);

  // updating tax and delivery charge
  updateTaxAndCharge();

  // updating total price
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};


// getting input prices of elements 
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};


// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};


// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");

  if (priceConverted <= 200) {
    setInnerText("delivery-charge", 20);
  }

  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};


//grandTotal update function
const updateTotal = () => {
  let priceTotal=  getInputValue("price")
  let deliveryCharge=getInputValue("delivery-charge");
  let taxTotal=  getInputValue("total-tax");
  let grandTotal =(priceTotal+deliveryCharge+taxTotal).toFixed(2);
  
  document.getElementById("total").innerText = grandTotal;

  return document.getElementById("total").innerText;
};

