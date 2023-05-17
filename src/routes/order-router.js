const {Router} = require("express");
const orderRouter = Router();
const {orderController} = require("../controller/index");
const authMiddleware = require("../middlewares/login-required");
const adminMiddleware = require("../middlewares/admin-required");

//관리자) 주문 정보 조회
orderRouter.get("/admin/:adminId", authMiddleware, adminMiddleware, orderController.adminGetOrder);

//비회원 주문 정보 조회
orderRouter.get("/:orderNumber", orderController.nonMemberGetOrder);

//주문 정보 조회
orderRouter.get("/order/:userId", authMiddleware, orderController.getOrder);

//비회원 새로운 주문 추가
orderRouter.post("/nonmember", orderController.createNonMemberOrder);

//새로운 주문 추가
orderRouter.post("/", authMiddleware, orderController.createOrder);

//관리자) 주문 수정
orderRouter.patch("/:adminId/:orderId", authMiddleware, adminMiddleware, orderController.adminUpdateOrder);

//주문 수정
orderRouter.patch("/:orderId", authMiddleware, orderController.updateOrder);

//비회원 주문 수정
orderRouter.patch("/nonmember/:orderId", orderController.updateOrder);

//주문 취소
orderRouter.delete("/:orderId", orderController.deleteOrder);

//관리자) 주문 취소
orderRouter.delete("/:adminId/:orderId", authMiddleware, adminMiddleware, orderController.adminDeleteOrder);

module.exports = orderRouter;
