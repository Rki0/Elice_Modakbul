const { Schema } = require('mongoose');

// 카테고리

const CategorySchema = new Schema ({
    name: {
        type: String,
        required: true,
        // unique: true,
    }
},
{
    collection: 'categories', // 몽고db의 categories라는 컬렉션에 이 스키마 저장
    timestamps: true,  // 자동으로 문서가 생성된 시간과 마지막으로 업데이트한 시간 저장
  }
);

module.exports = CategorySchema;