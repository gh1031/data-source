import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import serve from 'koa-static';
import views from 'koa-views';
import router from './router';
import responseTime from './middleware/responseTime';
// import './bootstrap/db';

const app = new Koa();

// 模版引擎
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
// 静态文件
app.use(serve(__dirname + '/static'));
app.use(bodyparser());
// 自定义中间价
app.use(responseTime());
app.use(router);

export default app;
