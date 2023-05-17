const mongoose = require('mongoose');
const { Schema } = mongoose;

//유저정보
const UserSchema = new Schema ({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  }]
}, {
  collection: "users",
  timestamps: true,
})

module.exports = UserSchema;
