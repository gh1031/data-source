class Base {
  constructor() {

  }
  response(code, errorMsg, data = null) {
    return {
      code,
      errorMsg,
      data,
      success: !code,
    }
  }
  returnData(code, errorMsg, data) {
    return this.response(code, errorMsg, data)
  }
}

module.exports = Base