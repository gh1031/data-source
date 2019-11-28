const Koa = require('koa');
const fs = require('fs');
const stripAnsi = require('strip-ansi');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const router = require('./router');
const app = new Koa();
const { randomColorLog, colorLog } = require('./utils/chalk')
const mongodb = require('./utils/db');

const CPU = process.cpuUsage()
const MEMO = process.memoryUsage()

// try {
//   require('./utils/execFile')
// } catch(e) {
//   colorLog('connect mongodb error' + e, 'red')
// }

/**
 * 连接数据库
 */

mongodb.connect()
colorLog(
    `CPU Usage:{
      user: ${CPU.user},\n
      system: ${CPU.system},\n
    }\nMEMO Usage:{
    rss: ${MEMO.rss},\n
    heapTotal: ${MEMO.heapTotal},\n
    heapUsed: ${MEMO.heapUsed},\n
    external: ${MEMO.external},\n
}`,
  'green'
)

const logFileName = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate()
  return `${year}-${month}-${date}`
}

app.use(logger({
  transporter: (str,args) => {
    colorLog(stripAnsi(str), 'red')
    fs.appendFile(
      `./log/${logFileName()}.txt`,
      `str: ${stripAnsi(str)}\nargs:${stripAnsi(args)}\n\n`,
      error => {
        randomColorLog(str)
        if (error) {
          colorLog('write log error' + error, 'red')
        }
    })
  }
}))
app.use(bodyparser())
app.use(router)

module.exports = app
