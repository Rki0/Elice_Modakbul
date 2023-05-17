const { Router } = require('express');
const {cartController} = require('../controller/index');
const authMiddleware = require('../middlewares/login-required');
const cartRouter = Router();

//장바구니 추가 라우터
cartRouter.post('/new', authMiddleware, cartController.cartPost);


//장바구니 조회 라우터
cartRouter.get('/view', authMiddleware, cartController.cartGet);


//장바구니 삭제 라우터
cartRouter.delete('/deleteOne/:cartId', authMiddleware, cartController.cartDeleteOne);


//장바구니 전체 삭제 라우터
cartRouter.delete('/deleteAll', authMiddleware, cartController.cartDeleteAll);

module.exports = cartRouter;