const router = require('koa-router')();
const user = require('./user');
const goods = require('./goods');
const demand = require('./demand');

router.get('/', async ctx => {
  ctx.body = 'home'
})

router.use('/user', user);
router.use('/goods', goods);
router.use('/demand', demand);
router.use(router.allowedMethods());

module.exports = router.routes();
