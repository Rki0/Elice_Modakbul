import { chageNumberToLocaleString } from "../utils/index.js";
const productList = document.querySelector(".product-content");
const nav = document.querySelector(".category");

let data = null;
let filteredData = null;
let category = null;

// 카테고리 가져오기
async function addcategory(e) {
  const res = await fetch("http://localhost:5000/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  category = await res.json();
  sessionStorage.setItem("categoryData", JSON.stringify(category));

  category.data.forEach((tab) => {
    const id = tab._id;
    const name = tab.name;

    nav.insertAdjacentHTML(
      "beforeend",
      `<li class="nav-item">
    <a class="nav-link active tab test" aria-current="page" href="#">${name}</a>
  </li>`
    );
  });

  const tag = document.getElementsByClassName("test");

  for (let i = 0; tag.length; i++) {
    tag[i].addEventListener("click", testFunction);
  }
}

addcategory();

// 상품 가져오기
async function addProductItems() {
  if (data === null) {
    const res = await fetch("http://localhost:5000/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const products = await res.json();
    console.log(products);
    sessionStorage.setItem("productData", JSON.stringify(products));
    localStorage.setItem("productData", JSON.stringify(products.data));

    data = products.data;
  }

  // 렌더링 초기화
  const parent = document.querySelector(".product-content");
  parent.replaceChildren();

  data.forEach((product) => {
    const name = product.name;
    const price = product.price;
    const company = product.company;
    const image = product.imgPath;

    productList.insertAdjacentHTML(
      "afterbegin",
      `<div class="product col" data-category="${category}">
      <a href="./productDetailPage.html" class="productItem">
      <div class="card">
      <img src="http://localhost:5000/${image}" class="product_img card-img-top" alt=""/>
        <div class="card-body">
          <h6 class="company card-title">${company}</h6>
          <h6 class="name card-title">${name}</h6>
          <h5 class="price card-text">${chageNumberToLocaleString(price)}</h5>
        </div>
      </div>
      </a>
    </div>
    `
    );

    const productItem = productList.querySelector(".productItem");
    productItem.addEventListener("click", () => {
      sessionStorage.setItem("name", JSON.stringify(product));
    });
  });
}
addProductItems();

function testFunction(e) {
  const targetCategory = e.target.innerText;
  console.log(targetCategory);

  // 데이터 초기화
  data = JSON.parse(localStorage.getItem("productData"));

  if (targetCategory !== "전체") {
    data = data.filter((item) => item.category === targetCategory);
  }

  addProductItems();
}
