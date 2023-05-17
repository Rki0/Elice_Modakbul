import { checkAuth } from "../utils/index.js";
const { isLoggedIn } = checkAuth();

const orderBtn = document.querySelector(".orderBtn");
const userInfoBtn = document.querySelector(".userInfoBtn");
const cartBtn = document.querySelector(".cartBtn");

// 주문 내역 조회 버튼 클릭 시 (로그인 여부)
orderBtn.addEventListener("click", () => {
  if (isLoggedIn) {
    window.location.href = "checkOrderPage.html";
  } else {
    window.location.href = "guestOrderPage.html";
  }
});

// 장바구니 버튼 클릭 시
cartBtn.addEventListener("click", () => {
  window.location.href = "cartPage.html";
});

// 회원 정보를 클릭 시 (로그인 여부)
userInfoBtn.addEventListener("click", () => {
  if (isLoggedIn) {
    window.location.href = "userMyInfo.html";
  } else {
    alert("로그인 후에 이용해주세요.");
    window.location.href = "loginPage.html";
  }
});
