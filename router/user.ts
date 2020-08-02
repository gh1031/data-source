import Router from 'koa-router';
import { DefaultState, Context } from 'koa';
import userControll from '../controller/user';

const router = new Router<DefaultState, Context>();
router
  .post('/registry', ctx => userControll.registry(ctx))
  .post('/login', ctx => userControll.login(ctx))

export default router.routes()
