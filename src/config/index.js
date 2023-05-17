const dotenv = require("dotenv");

const envFound = dotenv.config(); //dotenv를 이용하여 환경 변수를 읽어옴
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

if (process.env.MONGODB_URI === undefined) {
  throw new Error("MongDB 환경변수가 없습니다.");  
} 

module.exports = {
  applicationName: process.env.APPLICATION_NAME ?? "app", // 어플리케이션 이름

  port: parseInt(process.env.PORT ?? "3080", 10), // 어플리케이션이 바인딩되는 포트

  mongoDBUri: process.env.MONGODB_URI, // mongoDB 연결 주소

  secret: process.env.ACCESS_TOKEN_SECRET, //jwt token
};
