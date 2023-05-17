import { chageNumberToLocaleString } from "../utils/index.js";

export const STORAGE_NAME = "orderData";

export const SUMMARY_KEY_LIST = [
  "주문 번호",
  "상품 이름",
  "수량",
  "주문 가격",
  "판매사",
  "배송 상태",
];

// export const SUMMARY_PHRASE_LIST = (orderData) => [
//   `${orderData.orderNumber}`,
//   `${orderData.cart[0].name} 외 ${orderData.cart.length - 1}개`,
//   `총 ${orderData.cart.reduce((acc, curr) => {
//     return acc + curr.quantity;
//   }, 0)}개`,
//   `총 ${chageNumberToLocaleString(orderData.total)} 원`,
//   `${orderData.cart[0].company} 외 ${orderData.cart.length - 1}개`,
//   `${orderData.orderStatus}`,
// ];

export const SUMMARY_PHRASE_LIST = (orderData) => [
  `${orderData.orderNumber}`,
  `${
    orderData.cart.length === 1
      ? orderData.cart[0].name
      : `${orderData.cart[0].name} 외 ${orderData.cart.length - 1}개`
  }`,
  `총 ${orderData.cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0)}개`,
  `총 ${chageNumberToLocaleString(orderData.total)} 원`,
  `${
    orderData.cart.length === 1
      ? orderData.cart[0].company
      : `${orderData.cart[0].company} 외 ${orderData.cart.length - 1}개`
  }`,
  `${orderData.orderStatus}`,
];

export const CAN_CHANGE_ORDER_STATE = "상품 준비중";

export const CHANGE_BUTTON_TEXT = "변경";
export const CANCEL_BUTTON_TEXT = "취소";
