const { Schema } = require('mongoose');
// 상품명, 가격, 카테고리, 설명, 요약, 회사, 재고

const ProductSchema = new Schema ({

  //이름
  name: {
    type: String,
    required: true,
    unique: true
  },
  //가격
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
  // category: {
  //   type: String,
  //   required: true
  // },
  //설명
  description: { 
    type: String,
    required: true,
  },
  //요약
  summary: {
    type: String,
    required: true,
  },
  //회사
  company: {
    type: String,
    required: true,
  },
  //재고
  stock: {
    type: Number,
    required: true,
  },
  //이미지
  imgPath: {
    type: String,  // 이미지 파일의 경로를 저장
    required: true,
  }
}, {
  collection: "products",
  timestamps: true,
});

module.exports = ProductSchema;
