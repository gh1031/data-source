import Router from 'koa-router';
import { DefaultState, Context } from 'koa';
import user from './user';
import amap from './amap';

const router = new Router<DefaultState, Context>();
router.get('/', async ctx => {
  await ctx.render('index')
})

router.use('/user', user);
router.use('/amap', amap);
router.get('*', async ctx => {
  await ctx.render('404')
})
router.use(router.allowedMethods());

export default router.routes();
