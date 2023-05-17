import { chageNumberToLocaleString } from "../utils/index.js";

export const STORAGE_NAME = "orderData";

export const SUMMARY_KEY_LIST = ["상품 이름", "판매사", "주문 가격", "수량"];

export const SUMMARY_PHRASE_LIST = (orderData) => [
  `${
    orderData.data.length === 1
      ? orderData.data[0].name
      : `${orderData.data[0].name} 외 ${orderData.data.length - 1}개`
  }`,
  `${
    orderData.data.length === 1
      ? orderData.data[0].company
      : `${orderData.data[0].company} 외 ${orderData.data.length - 1}개`
  }`,
  `총 ${chageNumberToLocaleString(orderData.total)} 원`,
  `총 ${orderData.data.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0)}개`,
];
