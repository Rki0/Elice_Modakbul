const {cartService} = require('../service/index');
const utils = require("../misc/utils");


//장바구니 추가 컨트롤러
const cartPost = async (req, res) => {
    try{
        const userIdKey = req.user.id;
        const cartAdd = req.body;

        const newCartData = await cartService.postCart(userIdKey, cartAdd);
        res.status(201).json(utils.buildResponse(newCartData));
    } catch (err) {
        res.status(400).json({
            message: `${err.message}`
        });
    };
}

//장바구니 조회 컨트롤러
const cartGet = async (req, res) => {
    try{
        const userIdKey = req.user.id;
        const cartItems = await cartService.presentCart(userIdKey);
        res.status(201).json(utils.buildResponse(cartItems));
    } catch (err) {
        res.status(400).json({
            message: `${err.message}`
        });
    };
}

//장바구니 개별 삭제 컨트롤러
const cartDeleteOne = async (req, res) => {
    try {
        const userIdKey = req.user.id;
        const cartId = req.params;

        const deleteOneCartData = await cartService.removeCart(userIdKey, cartId);
        res.status(201).json(utils.buildResponse(deleteOneCartData));
    } catch (err) {
        res.status(400).json({
            message: `${err.message}`
        });
    };
}

//장바구니 전체 삭제 컨트롤러
const cartDeleteAll = async (req, res) => {
    try {
        const userIdKey = req.user.id;

        const deleteAllCartData = await cartService.removeAllCart(userIdKey);
        res.status(201).json(utils.buildResponse(deleteAllCartData));
    } catch (err) {
        res.status(400).json({
            message: `${err.message}`
        });
    };
}

const cartController = {
    cartPost,
    cartGet,
    cartDeleteOne,
    cartDeleteAll
};

module.exports = cartController;