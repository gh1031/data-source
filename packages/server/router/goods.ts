import Router from 'koa-router';
import goods from '../controller/goods';

const router = new Router();
router
  .get('/', ctx => { ctx.body = 'welcome goods page' })
  .get('/list', ctx => goods.list(ctx))

export default router.routes()
