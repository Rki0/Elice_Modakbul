import { CART_KEY_LIST, CART_VALUE_LIST } from "./const.js";
import { chageNumberToLocaleString } from "../utils/index.js";
import { checkAuth } from "../utils/index.js";

const { isLoggedIn, token } = checkAuth();

let cartData = [];

/**
 * 로그인한 유저의 장바구니 데이터를 얻기 위한 API 통신 함수
 */
async function getCartData() {
  try {
    // 장바구니 데이터 API 통신
    const response = await fetch("http://localhost:5000/api/carts/view", {
      method: "GET",
      headers: {
        Authorization: "bearer " + token,
      },
    });

    const responseData = await response.json();

    cartData = responseData.data;
    console.log(cartData);
  } catch (err) {
    console.log(err);
  }
}

/**
 * 로그인 유저의 장바구니 데이터를 받아와서 렌더링하는 함수
 */
async function renderCarts() {
  const cartsDiv = document.getElementsByClassName("carts")[0];

  // 리렌더링이 트리거된 경우 자식 노드를 모두 삭제하고 새로운 데이터로 다시 렌더링.
  cartsDiv.replaceChildren();

  // 회원/비회원 분기 처리를 통한 장바구니 데이터 할당
  if (isLoggedIn) {
    await getCartData();
  } else {
    cartData = JSON.parse(localStorage.getItem("cartData"));
  }

  // 장바구니 데이터가 없는 경우
  // 비회원의 경우 null, 회원의 경우 []가 된다.
  if (cartData === null || cartData.length < 1) {
    const h2 = document.createElement("h2");
    h2.innerText = "장바구니가 비었습니다.";

    cartsDiv.appendChild(h2);

    return;
  }

  for (let i = 0; i < cartData.length; i++) {
    const cartDiv = document.createElement("div");
    cartDiv.classList.add(
      "d-flex",
      "border",
      "border-success",
      "justify-content-between",
      "mb-4",
      "p-2",
      "rounded"
    );

    const productDiv = document.createElement("div");
    productDiv.classList.add("d-flex", "w-75", "align-items-center");

    const img = document.createElement("img");
    img.src = `http://localhost:5000/${cartData[i].imgURL}`;
    img.alt = "상품 이미지";
    img.classList.add("rounded", "pe-2");

    const ul = document.createElement("ul");
    ul.classList.add("m-0", "p-0");

    CART_KEY_LIST.forEach((key, index) => {
      const li = document.createElement("li");
      li.classList.add("mb-1");

      if (key === "수량") {
        const input = document.createElement("input");

        input.type = "number";
        input.max = "10";
        input.min = "1";
        input.value = `${cartData[i].quantity}`;
        input.classList.add("number_input");

        // input 변경이 있을 때마다 총 금액 계산 실행
        input.addEventListener("click", renderTotalPrice);

        const p = document.createElement("p");
        p.classList.add("m-0", "p-0", "me-2");
        p.innerText = `${key} : `;

        li.appendChild(p);
        li.appendChild(input);

        li.classList.add("d-flex", "align-items-center");

        ul.appendChild(li);
      } else {
        li.innerText = `${key} : ${
          typeof cartData[i][CART_VALUE_LIST[index]] === "number"
            ? `${chageNumberToLocaleString(
                cartData[i][CART_VALUE_LIST[index]]
              )} 원`
            : cartData[i][CART_VALUE_LIST[index]]
        }`;

        ul.appendChild(li);
      }
    });

    productDiv.appendChild(img);
    productDiv.appendChild(ul);
    cartDiv.appendChild(productDiv);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("d-flex", "align-items-end");

    const button = document.createElement("button");
    button.type = "button";
    button.innerText = "제거";
    button.classList.add(
      `delete_button_${cartData[i].id}`,
      "btn",
      "btn-outline-danger"
    );

    // 제거 버튼 클릭 시 API 통신 진행
    button.addEventListener("click", () => cartDeleteHandler(cartData[i]._id));

    buttonDiv.appendChild(button);

    cartDiv.appendChild(buttonDiv);
    cartsDiv.appendChild(cartDiv);
  }

  renderTotalPrice();
}

/**
 * 장바구니에서 데이터 하나를 제거하는 함수
 * @param {String} id 장바구니에 담긴 데이터 하나의 id
 */
async function cartDeleteHandler(id) {
  // 회원의 경우
  if (isLoggedIn) {
    try {
      // 장바구니 삭제 API 통신
      const response = await fetch(
        `http://localhost:5000/api/carts/deleteOne/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        }
      );

      if (!response.ok) {
        return alert(
          "장바구니 삭제 중 에러가 발생하였습니다. 다시 시도해주세요."
        );
      }

      // 화면에서 지우기
      cartData = cartData.filter((item) => item._id !== id);
    } catch (err) {
      console.log(err);
    }
  }

  // 비회원의 경우
  if (!isLoggedIn) {
    // 화면에서 지우기
    cartData = cartData.filter((item) => item._id !== id);

    // 변경된 데이터를 localStorage의 cartData에 반영
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }

  // 리렌더링
  renderCarts();
}

/**
 * 장바구니의 총 금액을 렌더링하는 함수
 */
function renderTotalPrice() {
  const totalPrice = chageNumberToLocaleString(calculateTotalPrice());

  const h2 = document.querySelector(".total_price");
  h2.innerText = `총 금액 : ${totalPrice} 원`;
}

/**
 * 장바구니에 담긴 물건의 총 금액을 계산하는 함수
 * @returns {Number} 장바구니 총 금액
 */
function calculateTotalPrice() {
  const input = document.getElementsByClassName("number_input");

  const totalPrice = cartData.reduce((acc, curr, index) => {
    return acc + parseInt(input[index].value) * curr.price;
  }, 0);

  return totalPrice;
}

const orderButton = document.querySelector(".order_button");

// 주문하기 버튼을 누르면 주문 진행 페이지로 이동한다.
orderButton.addEventListener("click", orderHandler);

/**
 * 구매 진행에 필요한 사항을 객체에 담아 주문 진행 페이지로 전달하는 함수
 */
function orderHandler() {
  if (cartData.length < 1) {
    return alert("장바구니에 아무것도 없어요!");
  }

  // 하나의 원소는 이름, 수량, 총 가격, 회사 데이터를 포함한다.
  let orderData = {
    data: [],
    total: null,
  };

  cartData.forEach((item, index) => {
    const input = document.getElementsByClassName("number_input");

    orderData.data = [
      ...orderData.data,
      {
        _id: item._id,
        name: item.name,
        quantity: parseInt(input[index].value),
        company: item.company,
        imgURL: item.imgURL,
      },
    ];
  });

  orderData.total = calculateTotalPrice();

  // 민감한 정보는 아니기 때문에 localStorage로 저장해서 사용
  localStorage.setItem("orderData", JSON.stringify(orderData));

  // 주문 진행 페이지로 이동
  window.location.href = "orderingPage.html";
}

renderCarts();
