import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import user from './user';
import goods from './goods';
import demand from './demand';

const router = new Router();
const indexPage = fs.readFileSync(path.resolve(__dirname, '../static/index.html'), 'utf8');

router.get('/', async ctx => {
  ctx.body = indexPage;
})

router.use('/user', user);
router.use('/goods', goods);
router.use('/demand', demand);
router.use(router.allowedMethods());

export default router.routes();
