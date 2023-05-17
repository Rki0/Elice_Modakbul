import { checkAuth } from "../utils/index.js";
const { isLoggedIn } = checkAuth();

const orderListBtn = document.querySelector(".orderListBtn");
const productListBtn = document.querySelector(".productListBtn");

orderListBtn.addEventListener("click", () => {
  if (isLoggedIn) {
    window.location.href = "admin-orderlistPage.html";
  } else {
    alert("로그인 후에 이용해주세요.");
    window.location.href = "logInPage.html";
  }
});

productListBtn.addEventListener("click", () => {
  if (isLoggedIn) {
    window.location.href = "admin-productListPage.html";
  } else {
    alert("로그인 후에 이용해주세요.");
    window.location.href = "logInPage.html";
  }
});
