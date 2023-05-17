import { userForm } from "../commonUI/index.js";
import {
  checkEmail,
  checkName,
  checkPhoneNumber,
  findAddress,
} from "../utils/index.js";

const main = document.querySelector(".common");

main.innerHTML = userForm();

const emailInput = document.querySelector("#emailInput");
const nameInput = document.querySelector("#nameInput"); //스키마 주의
const passwordInput = document.querySelector("#passwdInput");
const phoneNumberInput = document.querySelector("#phoneNumInput");
const passwordConfirmInput = document.querySelector("#passwdConfirmInput");
const signInBtn = document.querySelector("#signInBtn");

//주소찾기 관련 element
const findAddressBtn = document.querySelector("#findAddressBtn");
const postalCodeInput = document.querySelector("#postNumber");
const addInput1 = document.querySelector("#addInput1");
const addInput2 = document.querySelector("#addInput2");

findAddressBtn.addEventListener("click", findAddress);
signInBtn.addEventListener("click", addMember);

// 이벤트에 사용할 함수
async function addMember(e) {
  // preventDefault 안 하면 새로고침됨.
  e.preventDefault();

  // 입력값 가져오기
  const email = emailInput.value;
  const fullName = nameInput.value; //스키마 주의
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const address = `${postalCodeInput.value}##${addInput1.value}##${addInput2.value}`;
  const phoneNumber = phoneNumberInput.value;

  if (email == "") {
    return alert("이메일을 입력해 주세요!");
  } else {
    checkEmail(email);
  }

  if (password !== passwordConfirm) {
    return alert("비밀번호가 일치하지 않습니다.");
  }

  if (fullName == "") {
    return alert("이름을 입력해 주세요!");
  } else {
    checkName(fullName);
  }

  if (phoneNumber == "") {
    return alert("전화번호를 입력해 주세요!");
  } else {
    checkPhoneNumber(phoneNumber);
  }

  // 객체 만듦
  const data = {
    email,
    fullName,
    password,
    phoneNumber,
    address,
  };

  // JSON 만듦
  const dataJson = JSON.stringify(data);

  const apiUrl = `http://localhost:5000/api/users/sign-up`;

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    });

    if (res.ok) {
      alert("회원가입에 성공하였습니다!");
      window.location.href = "loginPage.html";
    } else {
      alert("회원가입에 실패하였습니다...");
    }
  } catch (err) {
    console.log(err);
  }
}
