const router = require('koa-router')()
const user = require('../controller/user');

router.get('/', async ctx => {
  ctx.body = 'welcome user page'
})

router
  .post('/registry', ctx => user.registry(ctx))
  .post('/login', ctx => user.login(ctx))
  .get('/menus', ctx => user.menus(ctx))
  .post('/menus', ctx => user.menus(ctx))
  .post('/menus/update', ctx => user.updateMenus(ctx))

module.exports = router.routes()
