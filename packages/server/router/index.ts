import Router from 'koa-router';
import { DefaultState, Context } from 'koa';
import userRoute from './user';
import amapRoute from './amap';
import spiderRoute from './spider';
import userControll from '../controller/user';

const router = new Router<DefaultState, Context>();
router.get('/', async ctx => {
  await ctx.render('index')
});
// 登录
router.get('/login', async ctx => {
  await ctx.render('login');
});
// 注册
router.get('/registry', async ctx => {
  await ctx.render('registry');
})

router.use('/user', userRoute);
router.use('/amap', amapRoute);
router.use('/spider', spiderRoute);
// route not match
router.get('*', async ctx => {
  await ctx.render('404')
})
router.use(router.allowedMethods());

export default router.routes();
