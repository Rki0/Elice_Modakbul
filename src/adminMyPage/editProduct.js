import { productForm } from "./form.js";
import { checkAuth } from "../utils/index.js";

const { isAdmin, token } = checkAuth();

addcreateOption();

const main = document.querySelector(".common");

main.innerHTML = productForm();

const nameInput = document.querySelector("#nameInput");
const priceInput = document.querySelector("#priceInput");
const summaryInput = document.querySelector("#summaryInput");
const companyInput = document.querySelector("#companyInput");
const categoryInput = document.querySelector("#categoryInput");
const stockInput = document.querySelector("#stockInput");
const descriptionInput = document.querySelector("#descriptionInput");

const saveProductBtn = document.querySelector("#saveProductBtn");
const cancelBtn = document.querySelector("#cancelBtn");

//이미지 preview
const fileDOM = document.querySelector("#file");
const preview = document.querySelector(".image-box");

fileDOM.addEventListener("change", () => {
  const imageSrc = URL.createObjectURL(fileDOM.files[0]);
  preview.src = imageSrc;
});

//수정버튼 클릭시
saveProductBtn.addEventListener("click", editProductData);

//취소버튼 클릭시
cancelBtn.addEventListener("click", () => {
  window.location.href = "/admin-productListPage";
});

insertProductElement();

//카테고리 추가 함수
async function addcreateOption() {
  //통신으로 category 받아오기
  const data = await getcategoryData();
  const categorydata = data.data;

  for (let i = 0; i < categorydata.length; i++) {
    const data = categorydata[i];
    const categoryName = data.name;

    categoryInput.insertAdjacentHTML(
      "beforeend",
      `<option name="category" value="${categoryName}">${categoryName}</option>`
    );
  }
}

//카테고리 통신으로 받아오는 함수
async function getcategoryData() {
  const apiUrl = "http://localhost:5000/api/categories";

  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    alert(`카테고리 로딩이 실패했습니다...`);
  }
}

//기존 데이터 받아와서 화면에 표시
async function insertProductElement() {
  //로컬에 상품 정보가 같이 넘어온 상태라면
  if (sessionStorage.getItem("targetName")) {
    const targetName = sessionStorage.getItem("targetName");

    const data = await getProductData();
    const productdata = data.data;
    const productId = productdata._id;

    //상품 오브젝트 id를 받아서 세션에 저장
    sessionStorage.setItem("productId", productId);

    nameInput.value = productdata.name;
    priceInput.value = productdata.price;
    summaryInput.value = productdata.summary;
    companyInput.value = productdata.company;
    stockInput.value = productdata.stock;
    descriptionInput.value = productdata.description;
    categoryInput.value = productdata.category;
    preview.src = productdata.imgPath; //이미지

    preview.setAttribute("src", `http://localhost:5000/${productdata.imgPath}`);
  } else {
    alert("잘못된 경로입니다!");
    window.location.href = "/index.html";
  }
  return;
}

//특정상품 API통신으로 조회해서 데이터값을 받아옴
async function getProductData() {
  const targetName = sessionStorage.getItem("targetName");

  const apiUrl = `http://localhost:5000/api/products/${targetName}`;

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

//save 버튼을 누르면 기존 값을 변경해서 새로 수정함
async function editProductData(e) {
  e.preventDefault();

  //수정할 상품의 오브젝id값을 세션에서 가져옴
  const productId = sessionStorage.getItem("productId");
  console.log(productId);

  //변경된 수정사항 updateData에 저장
  const updateData = new FormData(document.querySelector("#productForm"));

  console.log([...updateData]);

  const apiUrl = `http://localhost:5000/api/products/${productId}`;

  const res = await fetch(apiUrl, {
    method: "PATCH",
    // headers: {
    //   Authorization : "bearer " + token,
    // },
    body: updateData,
  });
  if (res.ok) {
    alert("상품 정보가 수정되었습니다!");
    window.location.href = "/admin-ProductListPage.html";
  } else {
    alert("상품 정보 수정에 실패하였습니다...");
  }
}
