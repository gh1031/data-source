import { ResponseDTO } from '../@types/index';

class Base {
  response(response: ResponseDTO): ResponseDTO {
    return {
      ...response,
      success: response.code === '0',
    }
  }
  
  return({
    code = '0',
    data = null,
    errorMsg = '',
    message = '',
  }): ResponseDTO {
    return this.response({
      code,
      data,
      errorMsg,
      message,
    })
  }
}

export default Base;
