import { chageNumberToLocaleString } from "../utils/index.js";

export const STORAGE_NAME = "orderData";

export const SUMMARY_KEY_LIST = ["상품 이름", "판매사", "주문 가격", "수량"];

export const SUMMARY_PHRASE_LIST = (orderData) => [
  `${orderData.cart[0].name} 외 ${orderData.cart.length - 1}개`,
  `${orderData.cart[0].company} 외 ${orderData.cart.length - 1}개`,
  `총 ${chageNumberToLocaleString(orderData.total)} 원`,
  `총 ${orderData.cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0)}개`,
];
