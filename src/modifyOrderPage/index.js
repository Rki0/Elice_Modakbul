import {
  checkEmail,
  checkName,
  checkPhoneNumber,
  checkAuth,
  findAddress,
} from "../utils/index.js";
import {
  STORAGE_NAME,
  SUMMARY_KEY_LIST,
  SUMMARY_PHRASE_LIST,
} from "./const.js";

const { isLoggedIn, token } = checkAuth();

let wantModifyData = null;

/**
 * 구매한 상품 데이터를 렌더링하는 함수
 */
function renderSummary() {
  // 주문 요약 보여주기
  const summaryDiv = document.querySelector(".order_summary");

  const img = document.createElement("img");
  img.src = `http://localhost:5000/${wantModifyData.cart[0].imgURL}`;
  img.alt = "상품 이미지";
  img.classList.add("rounded", "w-25");

  const ul = document.createElement("ul");
  ul.classList.add("m-0", "p-0");

  for (let i = 0; i < SUMMARY_PHRASE_LIST(wantModifyData).length; i++) {
    const li = document.createElement("li");

    li.innerText = `${SUMMARY_KEY_LIST[i]} : ${
      SUMMARY_PHRASE_LIST(wantModifyData)[i]
    }`;
    ul.appendChild(li);
  }

  summaryDiv.appendChild(img);
  summaryDiv.appendChild(ul);
}

function renderOrderData() {
  wantModifyData = JSON.parse(localStorage.getItem("modifyOrderData"));

  renderSummary();

  const [postNumber, address1, address2] = wantModifyData.customerAddress
    ? wantModifyData.customerAddress.split("##")
    : wantModifyData.customerId.address.split("##");

  const input = document.getElementsByTagName("input");

  for (let i = 0; i < input.length; i++) {
    if (input[i].id === "email_input") {
      input[i].value =
        wantModifyData.customerEmail || wantModifyData.customerId.email;
    }

    if (input[i].id === "name_input") {
      input[i].value =
        wantModifyData.customerName || wantModifyData.customerId.fullName;
    }

    if (input[i].id === "phone_input") {
      input[i].value =
        wantModifyData.customerPhoneNumber ||
        wantModifyData.customerId.phoneNumber;
    }

    if (input[i].id === "postNumber") {
      input[i].value = postNumber;
    }

    if (input[i].id === "addInput1") {
      input[i].value = address1;
    }

    if (input[i].id === "addInput2") {
      input[i].value = address2;
    }
  }
}

const cancel_btn = document.querySelector(".cancel_btn");

cancel_btn.addEventListener("click", cancelHandler);

/**
 * 주문 내역 조회 페이지로 되돌아가는 함수
 */
function cancelHandler() {
  window.location.href = "checkOrderPage.html";
}

// 수정하기 클릭 시 orderedPage로 이동

const modify_btn = document.querySelector(".modify_btn");

modify_btn.addEventListener("click", modifyHandler);

/**
 * 주문 내역 조회 페이지로 되돌아가는 함수
 */
async function modifyHandler() {
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

  const modifyData = {
    customerName: name,
    customerEmail: email,
    customerPhoneNumber: phoneNumber,
    customerAddress: `${postNumber}##${address1}##${address2}`,
  };

  if (isLoggedIn) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${wantModifyData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
          body: JSON.stringify(modifyData),
        }
      );

      if (response.ok) {
        alert("주문 정보가 수정되었습니다.");

        window.location.href = "checkOrderPage.html";
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (!isLoggedIn) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/nonmember/${wantModifyData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modifyData),
        }
      );

      if (response.ok) {
        alert("주문 정보가 수정되었습니다.");

        window.location.href = "checkOrderPage.html";
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const findAddressBtn = document.getElementById("address_input");

findAddressBtn.addEventListener("click", findAddress);

renderOrderData();
