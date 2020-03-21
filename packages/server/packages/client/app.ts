import Koa from 'koa';
import fs from 'fs';
import stripAnsi from 'strip-ansi';
import logger from 'koa-logger';
import bodyparser from 'koa-bodyparser';
import router from './router/index';
import { randomColorLog, colorLog } from './utils/chalk';
import './bootstrap/db';

const app = new Koa();
// const CPU = process.cpuUsage();
// const MEMO = process.memoryUsage();


const logFileName = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate()
  return `${year}-${month}-${date}`
}

app.use(logger({
  transporter: (str) => {
    colorLog(stripAnsi(str), 'red')
    fs.appendFile(
      `./log/${logFileName()}.txt`,
      `str: ${stripAnsi(str)}\nargs: \n\n`,
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

export default app;
