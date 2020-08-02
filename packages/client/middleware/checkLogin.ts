import { Context } from 'koa';

export default async (ctx: Context, next) => {
  if (!['/login', '/user/login','/registry' , '/user/registry'].includes(ctx.url)) {
    const token = ctx.cookies.get('__token__');
    if (!token) {
      // 301: 永久重定向 302: 临时重定向
      ctx.status = 302;
      ctx.set('Location', '/login');
    }
  }
  await next();
}
