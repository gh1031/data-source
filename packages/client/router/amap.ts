import Router from 'koa-router';
import amapController from '../controller/amap';

const router = new Router();

router.get('/', ctx => amapController.home(ctx))

export default router.routes();
