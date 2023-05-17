import { productForm } from "./form.js";
import { checkAuth } from "../utils/index.js";

const { isAdmin, token } = checkAuth();

addcreateOption();

//const main = document.querySelector('.common')
//main.innerHTML = productForm();

const nameInput = document.querySelector("#nameInput");
const priceInput = document.querySelector("#priceInput");
const summaryInput = document.querySelector("#summaryInput");
const companyInput = document.querySelector("#companyInput");
const stockInput = document.querySelector("#stockInput");
const descriptionInput = document.querySelector("#descriptionInput");

//등록, 취소버튼
const saveProductBtn = document.querySelector("#saveProductBtn");
const cancelBtn = document.querySelector("#cancelBtn");

//이미지 preview
const fileDOM = document.querySelector("#file");
const preview = document.querySelector(".image-box");

//해결해야 할 것들..
const fileInput = document.querySelector("#file");
const categoryInput = document.querySelector("#categoryInput");

//이미지 프리뷰 기능
fileDOM.addEventListener("change", () => {
  const imageSrc = URL.createObjectURL(fileDOM.files[0]);
  preview.src = imageSrc;
});

// //file 저장
// fileUploadBtn.addEventListener("click", () => {
//   const formData = new FormData();
//   // form Data 객체 생성

//   formData.append("attachedImage", fileInput.files[0])
// })

//취소버튼 -> 관리자 페이지로 이동
cancelBtn.addEventListener("click", () => {
  window.location.href = "./adminMyPage";
});
saveProductBtn.addEventListener("click", addProductSubmit);

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

//상품 추가 함수
async function addProductSubmit(e) {
  e.preventDefault();

  const name = nameInput.value;

  const formData = new FormData(document.querySelector("#productForm"));
  console.log(formData);

  formData.append("category", document.querySelector("#categoryInput").value);
  console.log([...formData]);

  //if(isAdmin){

  const apiUrl = `http://localhost:5000/api/products/add`;

  const res = await fetch(apiUrl, {
    method: "POST",
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    body: formData,
  });

  if (res.ok) {
    alert(`[${name}] 상품 등록에 성공하였습니다!`);
    window.location.href = "admin-productListPage.html";
  } else {
    alert(`상품 등록에 실패하였습니다...`);
  }
  //}
}
