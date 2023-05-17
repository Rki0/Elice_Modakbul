const {Router} = require("express");
const userRouter = Router();
const {userController} = require("../controller/index");
const authMiddleware = require("../middlewares/login-required");

//회원가입
userRouter.post("/sign-up", userController.signUp);

//로그인
userRouter.post("/login", userController.userLogin);

//관리자 로그인
userRouter.post("/admin-login", userController.adminLogin);

// 유저 정보 확인
userRouter.get("/:userId", authMiddleware, userController.getUser);

//유저 정보 수정 (이거는 덮어씌우는 것이기 때문에 put 사용)
userRouter.put("/:userId", authMiddleware, userController.createUser);

//유저 데이터 삭제
userRouter.delete("/:userId", authMiddleware, userController.deleteUser);

module.exports = userRouter;
