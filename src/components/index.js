import { checkAuth, logout } from "../utils/index.js";

const { isLoggedIn } = checkAuth();

function renderHeader() {
  const header = document.getElementsByTagName("header")[0];

  const content = `
  <nav class="navbar navbar-expand-lg bg-light mb-3">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.html">🏕️모닥불</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link" href="index.html">상품 목록</a>
        <a class="nav-link" href="userMyPage.html">마이페이지</a>
        <a class="nav-link" href="cartPage.html">장바구니</a>
        ${
          isLoggedIn
            ? `<div></div>`
            : `<a class="nav-link" href="signInPage.html">회원가입</a>`
        }
        ${
          isLoggedIn
            ? `<a class="nav-link logout_btn" style="cursor:pointer;">로그아웃</a>`
            : `<a class="nav-link" href="loginPage.html">로그인</a>`
        }
      </div>
    </div>
  </div>
</nav>`;

  header.innerHTML = content;

  const logout_btn = document.querySelector(".logout_btn");

  if (logout_btn !== null) {
    logout_btn.addEventListener("click", logout);
  }
}

function renderFooter() {
  const footer = document.getElementsByTagName("footer")[0];

  const content = `<div class="w-100 text-bg-success p-2 text-center mt-5">
  Copyright © 2023. Team Modakbul. All rights reserved.
</div>`;

  footer.innerHTML = content;
}

function renderLayout() {
  renderHeader();

  renderFooter();
}

renderLayout();
