// HTTP 응답을 보낼 때 일관된 응답을 보내주기 위한 보조 함수
// 만약 에러 메시지가 있다면 메시지를 담아서 보내주고 없다면 null로 하여 보내준다.
const buildResponse = (data, errorMessage) => {
    return {
      error: errorMessage ?? null,
      data,
    };
  }
  
  module.exports = {buildResponse};
  
