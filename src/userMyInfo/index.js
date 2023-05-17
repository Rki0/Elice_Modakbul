import {
  checkEmail,
  checkName,
  checkPhoneNumber,
  findAddress,
  logout,
} from "../utils/index.js";
import { userForm } from "../commonUI/updateForm.js";
import { checkAuth } from "../utils/index.js";
const { isLoggedIn, token } = checkAuth();

const userInfoForm = document.querySelector(".userInfo");
userInfoForm.innerHTML = userForm();

//폼
const emailInput = document.querySelector("#emailInput");
const currentPasswordInput = document.querySelector("#currentPasswordInput");
const passwordInput = document.querySelector("#passwordInput");
const nameInput = document.querySelector("#nameInput");
const phoneNumInput = document.querySelector("#phoneNumInput");
const postNumber = document.querySelector("#postNumber");
const addInput1 = document.querySelector("#addInput1");
const addInput2 = document.querySelector("#addInput2");
nameInput.readOnly = true;

//버튼
const findAddressBtn = document.querySelector("#findAddressBtn");
const changeBtn = document.querySelector("#changeBtn");
const deleteBtn = document.querySelector("#deleteBtn");

findAddressBtn.addEventListener("click", findAddress);
changeBtn.addEventListener("click", doCheckout);
deleteBtn.addEventListener("click", userDelete);

const userDataString = sessionStorage.getItem("userData");
const userData = JSON.parse(userDataString);
const userId = userData._id;

// 유저 정보 가져와서 input에 값 넣기
async function getUserData() {
  console.log(userId);
  try {
    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });
    const data = await res.json();
    nameInput.value = data.data.fullName;
    // currentPasswordInput.value = data.data.password;
    // passwordInput.value = data.data.password;
    // postNumber.value = data.address.post;

    const [post, address1, address2] = data.data.address.split("##");
    postNumber.value = post;
    addInput1.value = address1;
    addInput2.value = address2;
    // addInput2.value = data.address.address2;
    phoneNumInput.value = data.data.phoneNumber;
    emailInput.value = data.data.email;
  } catch (err) {
    console.log(err);
  }
}

getUserData();

// 검증 후 정보변경
async function doCheckout(e) {
  e.preventDefault();

  const email = emailInput.value;
  const currentPassword = currentPasswordInput.value;
  const password = passwordInput.value;
  const fullName = nameInput.value;
  const phoneNumber = phoneNumInput.value;
  const post = postNumber.value;
  const address = addInput1.value;
  const address2 = addInput2.value;

  // 비밀번호 입력 안 했을 때
  if (!currentPassword) {
    alert("현재 비밀번호를 입력해 주세요.");
    return;
  }

  if (!checkEmail(email)) {
    return;
  }
  if (!checkName(fullName)) {
    return;
  }
  if (!checkPhoneNumber(phoneNumber)) {
    return;
  }

  // 변경된 정보 추출
  const updatedInfo = {
    email,
    fullName,
    currentPassword,
    password,
    phoneNumber,
    address: `${post}##${address}##${address2}`,
  };

  console.log(updatedInfo);

  // 정보 변경
  try {
    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify(updatedInfo),
    });

    const data = await res.json();
    console.log(data);
    alert("회원 정보가 수정되었습니다.");
    window.location.href = "userMyPage.html";
  } catch (err) {
    console.log(err);
    alert("변경할 정보가 입력되지 않았습니다.");
  }
}

// 회원 탈퇴
async function userDelete(e) {
  e.preventDefault();
  const confirmed = confirm("정말 탈퇴 하시겠습니까?");
  if (confirmed) {
    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });

    logout();
    alert("이용해주셔서 감사합니다.");
    window.location.href = "index.html";
  }
}
