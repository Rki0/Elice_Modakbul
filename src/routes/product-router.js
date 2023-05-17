const { Router } = require('express');
const {productController} = require('../controller/index');
const productRouter = Router();
const multerMiddleware = require('../middlewares/multer');


// 상품 등록
productRouter.post("/add", multerMiddleware.upload.single("imgPath"), productController.createProduct);

//모든 상품 정보 조회
productRouter.get('/', productController.findAllProduct);

// 특정 상품 정보 조회
productRouter.get('/:name', productController.findOneProduct);

//특정 상품 정보 수정
productRouter.patch('/:productId', multerMiddleware.upload.single("imgPath"), productController.updateProduct);

//특정 상품 삭제
productRouter.delete('/:name', productController.deleteProduct);

module.exports = productRouter;

// 테스트