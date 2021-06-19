import Router from '@koa/router';
import userController from '../controller/user';

const router = new Router();

router
  .get('/', ctx => ctx.body = 'index of /service/user')
  .post('/register', ctx => userController.register(ctx))
  .post('/login', ctx => userController.login(ctx))
  .get('/alluser', ctx => userController.queryAllUser(ctx))

export default router;
