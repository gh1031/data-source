interface Response {
  code?: string;
  data?: unknown;
  errorMsg?: string;
  message?: string
}

class Base {
  response(response) {
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
  }: Response) {
    return this.response({
      code,
      data,
      errorMsg,
      message,
    })
  }
}

export default Base;
