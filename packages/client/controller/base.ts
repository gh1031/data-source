import { ResponseDTO } from "../typings";

class Base {
  constructor() {

  }
  response(response: ResponseDTO): ResponseDTO {
    return {
      ...response,
      success: response.code === '0',
    }
  }
  return({
    code = '0',
    errorMsg = '',
    data = null,
    message = '',
  }) {
    return this.response({
      code,
      errorMsg,
      data,
      message,
    })
  }
}

export default Base;
