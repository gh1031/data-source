const Base = require('./base');
class Goods extends Base{
  constructor() {
    super()
  }
  list(ctx) {
    ctx.body = this.returnData(0, '', 'success')
  }
}

module.exports = new Goods()