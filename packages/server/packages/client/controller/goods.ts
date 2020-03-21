// eslint-disable-next-line no-unused-vars
import { Context } from 'koa';
import Base from './base';
import {query} from '../bootstrap/db';

class Goods extends Base{
  async list(ctx: Context) {
    await query(`SELECT * FROM goods`)
      .then(res => {
        ctx.body = this.return({
          data: res,
        })
      }, err => {
        ctx.body = this.return({
          errorMsg: err,
        })
      })
  }
}

export default new Goods()
