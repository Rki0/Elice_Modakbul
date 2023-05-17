const {userService} = require("../service/index");
const {User} = require("../db/index");
const utils = require("../misc/utils");

const signUp = async (req, res, next) => {
  const userInfo = req.body;
  
  try {
    const userData = await userService.userSignUp(userInfo);
    res.status(201).json(utils.buildResponse(userData));
  } catch(err) {
    res.status(500);
    next(err);
  }
};

const userLogin = async (req, res, next) => {
  const loginInfo = req.body;

  try {
    const data = await userService.userLogin(loginInfo);

    res.status(200).json(utils.buildResponse(data));
  } catch(err) {
    res.status(400);
    next(err);
  }
};

const adminLogin = async (req, res) => {
  const loginInfo = req.body;

  try {
    const data = await userService.userLogin(loginInfo);
    const admin = await User.findOne({email: req.body.email});

    if (admin.role !== "admin") {
      return res.status(400).json({
        message: "권한이 없습니다.",
      });
    }

    const adminData = {data, role: admin.role}
    res.status(200).json(utils.buildResponse(adminData));
  } catch(err) {
    console.log(err);
    res.status(400).send(`${err}`);
  }
};

const getUser = async (req, res, next) => {
  try {
    const {userId} = req.params;

    const userData = await userService.checkUserData(userId);

    res.status(200).json(utils.buildResponse(userData));
  } catch(err) {
    next(err);
  }

};

const createUser = async (req, res, next) => {
  try {
    const {userId} = req.params;
    const { password, phoneNumber, address } = req.body;

    // password, phoneNumber, address 중 값이 하나라도 들어왔는지 확인
    if (!password && !phoneNumber && !address) {
      return res.status(400).json({
        message: "변경할 정보가 입력되지 않았습니다.",
      });
    }

    // 새 정보와 함께 updateUser 함수 호출
    const userData = await userService.updateUser(userId, req.body.currentPassword, {
      password,
      phoneNumber,
      address,
    });

    return res.status(200).json(utils.buildResponse(userData));
  } catch (error) {
    next(error);
  }
};

const deleteUser = async(req, res, next) => {
  try{
    const {userId} = req.params;
    const userData = await userService.deleteUser(userId);

    res.status(200).json(utils.buildResponse(userData));
  } catch(err) {
    next(err);
  }

};

const userController = {
  signUp,
  userLogin,
  adminLogin,
  getUser,
  createUser,
  deleteUser
};

module.exports = userController;