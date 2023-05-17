const jwt = require("jsonwebtoken");

//jwt 검증 미들웨어
const authMiddleware= (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //"Bearer 토큰 값"에서 토큰 값만 추출

  //토큰이 존재하지 않을 때
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "권한이 없습니다."
    })
  }

  try {

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    req.user = decodedToken;
    next();
  } catch(err) {
    return next(err);
  }

}


module.exports = authMiddleware;