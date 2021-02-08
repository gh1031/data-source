import Router from '@koa/router';
import user from './user';
import company from './company';

const router = new Router({ prefix: '/service' });

router.get('/', async ctx => {
  ctx.body = 'welcome to use node service'
});

router.use('/user', user.routes());
router.use('/company', company.routes());

export default router;
