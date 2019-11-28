const router = require('koa-router')()
const goods = require('../controller/goods')

router
  .get('/', ctx => { ctx.body = 'welcome goods page' })
  .get('/list', ctx => goods.list(ctx))

module.exports = router.routes()
