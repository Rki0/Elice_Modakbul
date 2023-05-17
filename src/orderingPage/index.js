import {
  STORAGE_NAME,
  SUMMARY_KEY_LIST,
  SUMMARY_PHRASE_LIST,
} from "./const.js";
import {
  checkEmail,
  checkName,
  checkPhoneNumber,
  findAddress,
  getUserData,
  chageNumberToLocaleString,
  checkAuth,
} from "../utils/index.js";

const { isLoggedIn, token } = checkAuth();

const orderData = JSON.parse(localStorage.getItem(STORAGE_NAME));

/**
 * 주문 진행을 위한 구매 예정 데이터를 렌더링하는 함수
 */
function renderOrder() {
  // 주문 요약 보여주기
  const summaryDiv = document.querySelector(".order_summary");

  const img = document.createElement("img");
  img.src = `http://localhost:5000/${orderData.data[0].imgURL}`;
  img.alt = "상품 이미지";
  img.classList.add("rounded", "me-5");

  const ul = document.createElement("ul");
  ul.classList.add("m-0", "p-0");

  for (let i = 0; i < SUMMARY_PHRASE_LIST(orderData).length; i++) {
    const li = document.createElement("li");

    li.innerText = `${SUMMARY_KEY_LIST[i]} : ${
      SUMMARY_PHRASE_LIST(orderData)[i]
    }`;
    ul.appendChild(li);
  }

  summaryDiv.appendChild(img);
  summaryDiv.appendChild(ul);

  // 로그인 여부에 따라 getUserData를 할지 말지 분기 처리
  if (isLoggedIn) {
    // 로그인 유저의 경우 DB에서 가져온 유저 데이터를 보여주고, 해당 데이터들의 input 태그는 disabled 처리
    const { email, fullName, phoneNumber, address } = getUserData();

    const [postNumber, address1, address2] = address.split("##");

    const input = document.getElementsByTagName("input");

    for (let i = 0; i < input.length; i++) {
      if (input[i].id === "email_input") {
        input[i].value = email;
        input[i].disabled = true;
      }

      if (input[i].id === "name_input") {
        input[i].value = fullName;
        input[i].disabled = true;
      }

      if (input[i].id === "phone_input") {
        input[i].value = phoneNumber;
        input[i].disabled = true;
      }

      if (input[i].id === "postNumber") {
        input[i].value = postNumber;
        input[i].disabled = true;
      }

      if (input[i].id === "addInput1") {
        input[i].value = address1;
        input[i].disabled = true;
      }

      if (input[i].id === "addInput2") {
        input[i].value = address2;
        input[i].disabled = true;
      }
    }
  }
}

const orderBtn = document.querySelector(".order_btn");

orderBtn.addEventListener("click", orderHandler);

/**
 * 주문하기 버튼 클릭 시, 유저의 데이터와 주문 데이터를 병합하여 API 통신을 진행하는 함수.
 * API 통신으로 주문 번호를 받아온 뒤, 이를 localStorage에 저장하고 주문 완료 페이지로 이동한다.
 */
async function orderHandler() {
  const email = document.getElementById("email_input").value;
  const name = document.getElementById("name_input").value;
  const phoneNumber = document.getElementById("phone_input").value;
  const postNumber = document.getElementById("postNumber").value;
  const address1 = document.getElementById("addInput1").value;
  const address2 = document.getElementById("addInput2").value;

  if (
    email === "" ||
    name === "" ||
    phoneNumber === "" ||
    postNumber === "" ||
    address1 === "" ||
    address2 === ""
  ) {
    return alert("모든 정보를 입력해주세요.");
  }

  // 이메일, 이름, 휴대전화 번호 검증
  if (
    !checkEmail(email) ||
    !checkName(name) ||
    !checkPhoneNumber(phoneNumber)
  ) {
    return;
  }

  let cartIdArr = [];

  for (let i = 0; i < orderData.data.length; i++) {
    cartIdArr.push(orderData.data[i]._id);
  }

  // 회원 주문 API 통신
  if (isLoggedIn) {
    const purchaseData = {
      customerId: getUserData()._id,
      customerPhoneNumber: phoneNumber,
      customerAddress: `${postNumber}##${address1}##${address2}`,
      cart: cartIdArr,
      total: orderData.total,
    };

    try {
      // API 통신으로 주문번호 받아오기
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify(purchaseData),
      });

      const responseData = await response.json();

      localStorage.setItem("orderedData", JSON.stringify(responseData.data));

      if (response.ok) {
        // 주문 완료 페이지로 이동
        window.location.href = "orderedPage.html";
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 비회원 주문 API 통신
  if (!isLoggedIn) {
    const purchaseData = {
      customerName: name,
      customerEmail: email,
      customerPhoneNumber: phoneNumber,
      customerAddress: `${postNumber}##${address1}##${address2}`,
      // cart: cartIdArr,
      total: orderData.total,
    };

    try {
      // API 통신으로 주문번호 받아오기
      const response = await fetch(
        "http://localhost:5000/api/orders/nonmember",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(purchaseData),
        }
      );

      const responseData = await response.json();

      const cartData = JSON.parse(localStorage.getItem("cartData"));

      const data = { ...responseData.data, cart: cartData };

      localStorage.setItem("orderedData", JSON.stringify(data));

      if (response.ok) {
        // 주문 완료 페이지로 이동
        window.location.href = "orderedPage.html";
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const cancelBtn = document.querySelector(".cancel_btn");

cancelBtn.addEventListener("click", cancelHandler);

/**
 * 취소하기 버튼 클릭 시, 이전 페이지로 이동하는 함수
 */
function cancelHandler() {
  // 이전 페이지로 이동
  // 장바구니 페이지에서 접근했을 수도 있고, 제품 상세 페이지에서 접근했을 수도 있다.
  window.location.href = document.referrer;
}

const findAddressBtn = document.querySelector(".find_address_btn");

findAddressBtn.addEventListener("click", findAddress);

renderOrder();
