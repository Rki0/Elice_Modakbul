const bcrypt = require("bcrypt");
const {User} = require("../db/index");
const jwt = require("jsonwebtoken");



//회원가입 
const userSignUp = async (userInfo) => {
  try {
    // userInfo로 가져온 정보들을 구조분해할당
    const {email, fullName, password, phoneNumber, address} = userInfo;

    // 이메일 중복 검사
    const duplicatedEmail = await User.findOne({email}).lean();

    if (duplicatedEmail) {
      throw new Error("이미 등록된 이메일입니다.");
    }

    //비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    //사용자 생성
    const newUser = new User ({
      email,
      fullName,
      password: hashedPassword, //해시된 패스워드 사용
      phoneNumber,
      address,
    })

    //사용자 정보 저장
    const savedUser = newUser.save();
    
  } catch(err) {
    throw new Error(err);
  }
};

//로그인
const userLogin = async (loginInfo) => {
  const {email, password} = loginInfo;
  
  const user = await User.findOne({email: email}).lean();


  //이메일 일치 여부
  if (!user) {
    throw new Error ("이메일 또는 패스워드가 일치하지 않습니다.");
  }

  const userPassword = await bcrypt.compare(password, user.password);
  

  //비밀번호 일치 여부
  if (!userPassword) {
    throw new Error ("이메일 또는 패스워드가 일치하지 않습니다.");
  }

  //로그인 성공 후 토큰 생성
  const token = jwt.sign({
    id: user._id,
    email: user.email,
  }, 
  process.env.ACCESS_TOKEN_SECRET,
  {expiresIn: "1h"} );

  const data = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    address: user.address,
    phoneNumber: user.phoneNumber,
    token: token,
  }

  return data;
};

//관리자 로그인
const adminLogin = async (loginInfo) => {
  const {email, password} = loginInfo;
  
  const admin = await User.findOne({email: email}).lean();


  //이메일 일치 여부
  if (!admin) {
    throw new Error ("이메일 또는 패스워드가 일치하지 않습니다.");
  }

  const userPassword = await bcrypt.compare(password, admin.password);
  

  //비밀번호 일치 여부
  if (!userPassword) {
    throw new Error ("이메일 또는 패스워드가 일치하지 않습니다.");
  }

  //로그인 성공 후 토큰 생성
  const token = jwt.sign({
    id: admin._id,
    email: admin.email,
  }, 
  process.env.ACCESS_TOKEN_SECRET,
  {expiresIn: "1h"} );

  const data = {
    _id: admin._id,
    email: admin.email,
    fullName: admin.fullName,
    address: admin.address,
    phoneNumber: admin.phoneNumber,
    token: token,
  }

  return data;
};

//유저 정보 확인
const checkUserData = async (userId) => {
  const user = await User.findOne({_id: userId}).lean();

  //유저가 존재하지 않을 경우
  if (!user) {
    throw new Error("가입 내역이 없습니다.");
  }

  const userData = {
    email: user.email,
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
    address: user.address
  }

  return userData;
}

//유저 정보 수정 
const updateUser = async (userId, currentPassword, newInfo) => {
  try {
    const user = await User.findOne({_id: userId}).lean();
    if (!user) throw new Error("가입 내역이 없습니다.");

    // 현재 비밀번호 확인
    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCorrectPassword) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    // 새로운 유저 정보 추가
    const updateData = {};
    if (newInfo.password) {
      const hashedPassword = await bcrypt.hash(newInfo.password, 10);
      updateData.password = hashedPassword;
    }
    if (newInfo.phoneNumber) {
      updateData.phoneNumber = newInfo.phoneNumber;
    }
    if (newInfo.address) {
      updateData.address = newInfo.address;
    }

    // 유저 정보 업데이트
    return await User.updateOne({_id: userId}, updateData).lean();
  } catch (err) {
    throw err;
  }
};

//유저 데이터 삭제
const deleteUser = async (userId) => {
  try {
    return await User.deleteOne({_id: userId}).lean();
  } catch(err) {
    throw err;
  }
}

const userService = {
  userSignUp,
  userLogin,
  adminLogin,
  checkUserData,
  updateUser,
  deleteUser,
};

module.exports = userService;
