// 测试中间件执行流程

const wait = (second) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('wating 3s...');
      resolve(true)
    }, second * 1000);
  })
}

function testMiddlewareControlFlow(app) {
  
  app.use(async (ctx, next) => {
    console.log('[middleware 1]: request into middleware1');
    await wait(2);
    await next();
    console.log('[middleware 1]: control back to 1')
  })
  
  app.use(async (ctx, next) => {
    console.log('[middleware 2]: 2 get control');
    await wait(2);
    await next();
    console.log('[middleware 2]: control back to 2')
  })
  
  app.use(async (ctx, next) => {
    console.log('[middleware 3]: 3 get control');
    await wait(2);
    await next();
    console.log('[middleware 3]: control back to 3')
  })

}
/**
 * when flow downstream
 * [middleware 1]: request in
 * wait 3s
 * [middleware 2]: 2 get control
 * wait 3s
 * [middleware 3]: 3 get control
 * 
 * ohter middleware exec
 * 
 * when flow upstream
 * [middleware 3]: control back to 3
 * [middleware 2]: control back to 2
 * [middleware 1]: control back to 1
 */

export default testMiddlewareControlFlow;
