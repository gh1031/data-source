const router = require('koa-router')();
const demand = require('../controller/demand');

router
  .get('/', ctx => ctx.body = 'welcome come to demand page')
  .post('/add', ctx => demand.add(ctx))
  .get('/list', ctx => demand.list(ctx))

module.exports = router.routes();
