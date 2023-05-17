const guestName = document.querySelector("#guestName");
const inputOrderNumber = document.querySelector("#orderNumber");
const guestOrderBtn = document.querySelector("#guestOrderBtn");

guestOrderBtn.addEventListener("click", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();

  const name = guestName.value;
  const orderNumber = inputOrderNumber.value;

  if (!name) {
    return alert("주문자명을 입력하세요.");
  }
  if (!orderNumber) {
    return alert("주문번호를 입력하세요.");
  }

  try {
    const res = await fetch(`http://localhost:5000/api/orders/${orderNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("nonmemberData", JSON.stringify(data));
      window.location.href = "checkOrderPage.html";
    }
  } catch (err) {
    console.log(err);
    return alert("요청하신 주문 내역이 없습니다.");
  }
}
