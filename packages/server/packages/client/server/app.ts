import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
// import serve from 'koa-static';
// import views from 'koa-views';
import router from './router';
// import responseTime from './middleware/responseTime';
// import checkLogin from './middleware/checkLogin';
import middlewareExecOrder from './middlewares/execOrder';

const app = new Koa();

// 模版引擎
// app.use(views(__dirname + '/views', {
//   extension: 'ejs'
// }))
// 静态文件
// app.use(serve(__dirname + '/static'));
app.use(bodyparser());
// 自定义中间价
// app.use(responseTime());
// app.use(checkLogin);
// 路由
// testMiddlewareControlFlow(app);

// app.use(async ctx => {
//   ctx.body = 'hello world';
//   console.log('request was responsed');
// })
app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
