import { chageNumberToLocaleString, checkAuth } from "../utils/index.js";

const { isAdmin, token } = checkAuth();

const orderListContainer = document.querySelector("#oderList-container");
backBtn.addEventListener("click", () => {
  window.location.href = "admin-myPage.html";
});

const productListContainer = document.querySelector("#productList-container");

// 데이터를 받아 요소를 만든 후, html에 삽입
insertProductElement();

const editBtn = document.querySelector("#editBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const addproductBtn = document.querySelector("#addproductBtn");

addproductBtn.addEventListener(
  "click",
  () => (window.location.href = "/admin-addProductPage.html")
);

const ActionFunctions = {
  edit: (e) => editPagehandler(e),
  delete: (e) => deleteProduct(e),
};

productListContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".container");
  const targetName = target.dataset.name;
  const action = e.target.dataset.action;
  if (action) {
    ActionFunctions[action]({
      targetName,
    });
  }
});

//모든상품 API로 조회하는 함수
async function getProductData() {
  const apiUrl = "http://localhost:5000/api/products";

  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    alert(`페이지 로딩이 실패했습니다...`);
  }
}

async function insertProductElement() {
  //관리자일때만
  //if(isAdmin){
  const data = await getProductData();
  const productdata = data.data;
  //}

  for (let i = 0; i < productdata.length; i++) {
    const data = productdata[i];

    const productId = data._id;
    const Productname = data.name;
    const Productstock = data.stock;
    const Productprice = chageNumberToLocaleString(data.price);
    const Productimg = data.imgPath;
    const productcategory = data.category;

    //요소 만들기
    productListContainer.insertAdjacentHTML(
      "beforeend",
      `
  <div class="container rounded border border-secondary" id="${productId}" name="${Productname}" data-name="${data.name}">
      <div class="row">
        <img class="productImg col" src="http://localhost:5000/${Productimg}">
        <div class="table-box col">
          <table class="table table-borderless text-center">
            <thead  class="border-bottom">
              <tr>
                <th>상품 이름</th>
                <th>카테고리</th>
                <th>가격</th>
                <th>재고</th>
              </tr>
            </thead>
            <tbody>
              <tr class="align-middle">
                <td><div class="name ">${Productname}</div></td>
                <td>
                  <div>${productcategory}</div>
                </td>
                <td><div class="price">${Productprice}원</div></td>
                <td><div class="stock">${Productstock}개</div></td>
                </tr>
            </tbody> 
          </table>
        </div>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" data-action="edit" class="btn btn-dark">Edit</button>
        <button type="button" data-action="delete" class="btn btn-outline-danger">Delete</button>
      </div>
      </div>
  `
    );
  }
}

//페이지 전환 + targetName 넘기는 함수
function editPagehandler(e) {
  sessionStorage.setItem("targetName", e.targetName);
  window.location.href = "/admin-editProductPage.html";
}

//상품 삭제 함수
async function deleteProduct(e) {
  const targetName = e.targetName;

  const apiUrl = `http://localhost:5000/api/products/${targetName}`; //삭제하고자 하는 상품의 name

  const answer = confirm(`정말 [${targetName}]상품을 삭제하시겠습니까?`);
  if (answer) {
    //API 통신으로 DB에서 상품 삭제
    const res = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      //상품 삭제 성공시
      alert(`[${targetName}]상품 삭제에 성공하였습니다!`);
      window.location.reload();
    } else {
      alert(`상품 삭제에 실패하였습니다...`);
    }
  }
}
