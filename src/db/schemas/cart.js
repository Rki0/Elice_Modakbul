const mongoose = require('mongoose');
const { Schema } = mongoose;

//장바구니 페이지에 보여질 상품에 대한 스키마 정리입니다.
const CartSchema = new Schema({
    //현재 구현 단계이므로 required 되지 않은 상태입니다.
    imgURL: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    //quantity는 주문할 갯수를 설정합니다.
    quantity: {
        type: Number,
        required: true,
    },
    //장바구니에 담은 유저의 ObjectId를 가집니다.
    poster: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
},{
  collection: "carts",
  timestamps: true,
});

module.exports = CartSchema;