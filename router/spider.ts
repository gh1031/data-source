import Router from 'koa-router';
import spiderController from '../controller/spider';

const router = new Router();

router.get('/', ctx => spiderController.home(ctx))

export default router.routes();
