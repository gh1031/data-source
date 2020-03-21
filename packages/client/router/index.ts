import Router from 'koa-router';
import user from './user';
import goods from './goods';
import demand from './demand';

const router = new Router();

router.get('/', async ctx => {
  ctx.body = 'home'
})

router.use('/user', user);
router.use('/goods', goods);
router.use('/demand', demand);
router.use(router.allowedMethods());

export default router.routes();
