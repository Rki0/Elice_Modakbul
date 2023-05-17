const {Category} = require('../db/index');

const addCategory = async (categoryInfo) => {
    try {
        // categoryInfo로 가져온 정보들을 구조분해할당
        const {name} = categoryInfo;

        // 카테고리이름 중복 체크
        const nameDuplicate = await Category.findOne({ name });

        if (nameDuplicate) {
            throw new Error('이미 등록된 카테고리입니다.');
          }

        // 카테고리 생성
        const newCategory = new Category({
            name
        });

        const savedCategory = await newCategory.save();

        return savedCategory;
    } catch (err) {
        throw new Error(`카테고리 등록에 실패했습니다. ${err.message}`);
    }
};

// 모든 카테고리 조회
const findAll = async () => {
    try {
        const categories = await Category.find({});

        return categories;
    } catch (err) {
        throw new Error(`카테고리 조회에 실패했습니다. ${err.message}`);
    }
}

// 특정 카테고리 조회 (major만 입력하면 minor 카테고리까지 조회됨)
const findCategory = async (name) => {
    try {
        const category = await Category.findOne({name});

        if(!category) {
            throw new Error(`존재하지 않는 카테고리입니다.`);
        }

        return category;
    } catch (err) {
        throw new Error(`카테고리 조회에 실패했습니다. ${err.message}`);
    }
}

// 특정 카테고리 이름 수정 
const updateCategoryName = async (name, newName) => {
    try {
        const category = await Category.findOneAndUpdate({name}, newName, {new: true});
        return category;
    } catch (err) {
        throw new Error(`카테고리 이름 수정에 실패했습니다. ${err.message}`);
    }
};

const deleteCategory = async (name) => {
    try {
        const deleteCategory = await Category.deleteOne({name});
        return deleteCategory;
    } catch (err) {
        throw new Error(`카테고리 삭제에 실패했습니다. ${err.message}`);
    }
};

module.exports = { addCategory, findAll, findCategory, updateCategoryName, deleteCategory };