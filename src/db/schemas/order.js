const { Schema } = require('mongoose');

//회의에서 진행된 order_schema 입니다.
const OrderSchema = new Schema({
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    customerName: {
      type: String,
      required: false,
    },
    customerEmail: {
      type: String,
      required: false,
    },
    customerPhoneNumber: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "상품 준비중"
    },
    cart: [{
      type: Schema.Types.ObjectId,
      ref: 'Cart',
      required: false,
    }],
    total: {
        type: Number,
        required: true,
    },
    orderNumber: {
      type: String,
      required: true,
    }
},{
  collection: "orders",
  timestamps: true,
})

module.exports = OrderSchema;
