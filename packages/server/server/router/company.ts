import Router from '@koa/router';
import companyController from '../controller/company';

const router = new Router();

router
  .get('/', ctx => ctx.body = 'index of /service/company')
  .post('/add/department', ctx => companyController.addDepartment(ctx))


export default router;
