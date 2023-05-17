const { Router } = require('express');
const {categoryController} = require('../controller/index');
const categoryRouter = Router();

// 카테고리 생성
categoryRouter.post('/add', categoryController.createCategory);

// 전체 카테고리 조회
categoryRouter.get('/', categoryController.getAllCategory);

// 특정 카테고리 조회
categoryRouter.get('/:name', categoryController.findCategoryName);

// 특정 카테고리 이름 수정
categoryRouter.put('/:name', categoryController.updateCategory);

// 특정 카테고리 삭제 기능
categoryRouter.delete('/:name', categoryController.deleteCategory);


module.exports = categoryRouter;