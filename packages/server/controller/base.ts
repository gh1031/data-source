import { ResponseDTO } from '../typings';

class Base {
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
  }): ResponseDTO {
    return this.response({
      code,
      errorMsg,
      data,
      message,
    })
  }
}

export default Base;
