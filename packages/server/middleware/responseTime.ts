import { Middleware } from 'koa';

export default (): Middleware => {
  return async (ctx, next): Promise<void> => {
    const start = Date.now();
    await next()
    const ms = Date.now() - start;
    console.log(`response use ${ms}ms`)
  }
}
