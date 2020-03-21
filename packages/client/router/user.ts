import Router from 'koa-router';
import user from '../controller/user';

const router = new Router();
router
  .get('/', async ctx => {
    ctx.body = 'welcome user page'
  })

router
  .get('/register', ctx => user.register(ctx))
  .get('/login', ctx => user.login(ctx))
  .get('/menus', ctx => user.menus(ctx))
  .post('/menus', ctx => user.menus(ctx))
  .post('/menus/update', ctx => user.updateMenus(ctx))

export default router.routes()
