let category = null;

/**
 * 카테고리를 렌더링 하는 함수
 */
async function renderCategory() {
  // 카테고리 데이터를 얻기 위한 API 통신
  const response = await fetch("http://localhost:5000/api/categories");

  const responseData = await response.json();

  category = responseData.data;

  const majorCategory = document.querySelector(".major_category");

  // 재렌더링을 위해 자식 요소 삭제
  majorCategory.replaceChildren();

  // 상위 카테고리를 전부 담을 ul 생성
  const majorUl = document.createElement("ul");
  majorUl.classList.add("m-0", "p-0");

  for (let i = 0; i < category.length; i++) {
    // 상위 카테고리 하나를 담을 li 생성
    const majorLi = document.createElement("li");
    majorLi.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "border-bottom",
      "border-secondary",
      "p-2"
    );

    // 상위 카테고리 명을 담을 p 생성
    const majorP = document.createElement("p");
    majorP.innerText = `${category[i].name}`;
    majorP.classList.add("category_text", "m-0", "w-75", "ps-1");
    majorLi.appendChild(majorP);

    // 상위 카테고리 수정을 위한 input 생성
    const majorModifyInput = document.createElement("input");
    majorModifyInput.type = "text";
    majorModifyInput.classList.add(
      "major_modify_input",
      "form-control",
      "d-none",
      "w-75"
    );
    majorModifyInput.placeholder = "상위 카테고리 수정";
    majorModifyInput.maxlength = "15";
    majorModifyInput.value = majorP.innerText;

    majorLi.appendChild(majorModifyInput);

    // 상위 카테고리 수정 button 생성
    const modifyBtn = document.createElement("button");
    modifyBtn.innerText = "수정";
    modifyBtn.classList.add(
      "major_modify_btn",
      "btn",
      "btn-outline-warning",
      "w-25",
      "me-2"
    );

    modifyBtn.addEventListener("click", modifyMajorHandler);

    majorLi.appendChild(modifyBtn);

    // 상위 카테고리 삭제 button 생성
    const majorDeleteBtn = document.createElement("button");
    majorDeleteBtn.innerText = "삭제";
    majorDeleteBtn.classList.add(
      "major_delete_btn",
      "btn",
      "btn-outline-danger",
      "w-25"
    );

    majorDeleteBtn.addEventListener("click", deleteCategoryHandler);

    majorLi.appendChild(majorDeleteBtn);

    majorUl.appendChild(majorLi);
  }

  majorCategory.appendChild(majorUl);
}

const majorBtn = document.querySelector(".major_btn");

majorBtn.addEventListener("click", addCategoryHandler);

/**
 * 카테고리를 추가하는 함수
 */
async function addCategoryHandler() {
  const majorInput = document.querySelector(".major_input");

  if (majorInput.value === "") {
    return alert("1글자 이상 입력해주세요.");
  }

  const addedMajor = majorInput.value;

  majorInput.value = "";
  majorInput.focus();

  const newMajor = {
    name: addedMajor,
  };

  try {
    const response = await fetch("http://localhost:5000/api/categories/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMajor),
    });

    if (response.ok) {
      // 카테고리 재렌더링
      renderCategory();
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * 상위 카테고리를 수정할 수 있도록 p 태그를 input 태그로 변환하는 함수
 * @param {Event} e 상위 카테고리 수정 버튼 클릭 이벤트
 */
async function modifyMajorHandler(e) {
  const parent = e.target.parentNode;
  const majorP = parent.querySelector(".category_text");
  const majorModifyInput = parent.querySelector(".major_modify_input");

  // 카테고리 수정을 위해 수정 버튼을 클릭 했을 때
  if (e.target.innerText === "수정") {
    e.target.innerText = "저장";
  } else {
    // 카테고리 수정 후 저장 버튼을 클릭 했을 때

    // 변경된 카테고리 정보
    const content = {
      name: majorModifyInput.value,
    };

    // 수정을 위한 API 통신
    const response = await fetch(
      `http://localhost:5000/api/categories/${majorP.innerText}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      }
    );

    if (response.ok) {
      e.target.innerText = "수정";

      renderCategory();
    }
  }

  majorP.classList.toggle("d-none");
  majorModifyInput.classList.toggle("d-none");
}

/**
 * 상위 카테고리를 제거하는 함수
 * @param {Event} 상위 카테고리 제거 버튼 클릭 이벤트
 */
async function deleteCategoryHandler(e) {
  const parent = e.target.parentNode;
  const deleteTarget = parent.querySelector(".category_text").innerText;

  try {
    const response = await fetch(
      `http://localhost:5000/api/categories/${deleteTarget}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      // 카테고리 재렌더링
      renderCategory();
    }
  } catch (err) {
    console.log(err);
  }
}

renderCategory();
