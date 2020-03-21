import Router from 'koa-router';
import demand from '../controller/demand';

const router = new Router();
router
  .get('/', ctx => ctx.body = 'welcome come to demand page')
  .post('/add', ctx => demand.add(ctx))
  .get('/list', ctx => demand.list(ctx))

export default router.routes();
