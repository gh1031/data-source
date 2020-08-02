import path from 'path';
import fs from 'fs';
import formidable from 'formidable';
import Base from './base';
import * as db from '../bootstrap/mysql';
import { insertUser } from '../sqls/update';
import { isUserExist, isThisUser } from '../sqls/query';
import { Context } from 'koa';

const ONE_DAY = 24 * 60 * 60 * 1000;
class User extends Base{
  /**
   * 
   * @param {Context} ctx 
   * @description 注册模块
   */
  async registry(ctx): Promise<unknown> {
    // const { query, body } = ctx.request;
    const form = formidable({
      multiples: true,
      uploadDir: path.resolve(__dirname, '../static/uploads'),
      keepExtensions: true,
    });
    function getFormData(): Promise<unknown> {
      return new Promise((resolve, reject) => {
        form.parse(ctx.req, async function (err, fields, files) {
          if (err) {
            return ctx.body = err;
          }
          ctx.request.body = fields;
          ctx.request.files = files;
          fs.rename(
            files.file.path,
            path.resolve(__dirname, '../static/uploads', files.file.name), function (err) {
            if (err) {
              console.log('rename error!');
              reject('rename error!')
            }
            console.log('rename success');
            resolve();
          })
        })
      })
    }
    await getFormData().catch(err => console.log(err));
    const { username: name, password } = ctx.request.body;
    const { path: avator } = ctx.request.files.file;
    console.log(name, password, avator)
    const isExist = await db.query(isUserExist(name));
    if (!name || !password || !avator) {
      return ctx.body = this.return({ data: false, errorMsg: '有选项为空' })
    }

    if ((isExist as []).length > 0) {
      return ctx.body = this.return({
        data: false,
        message: '用户已存在，请重新注册！',
      })
    }

    return await db.query(insertUser, {
      name,
      password,
      avator,
      gmt_create: Date.now(),
    }).then(
        result => {
          console.log(result);
          ctx.body = this.return({ data: true, message: '注册成功！' })
        }, 
        err => {
          ctx.body = this.return({ errorMsg: err })
        }
      )
  }

  /**
   * 
   * @param {Object} ctx 
   * @description 登录模块
   */
  async login(ctx: Context): Promise<unknown> {
    const { body } = ctx.request;
    const { username, password } = (body || {});
    if (!username || !password) {
      return ctx.body = this.return({ data: false, errorMsg: '账号或密码为空' })
    }
    return await db.query(isThisUser, [username, password])
      .then(
        async (result: object[]) => {
          if (result.length <= 0) {
            return ctx.body = this.return({ data: null, message: '账号或密码不正确，请重试！'})
          }
          // 设置cookie
          ctx.cookies.set('__token__', username, {
            maxAge: ONE_DAY,
            path: '/',
            httpOnly: true,
          })
          ctx.body = this.return({ data: result[0], message: '登录成功！' })
        }, 
        err => {
          ctx.body = this.return({ errorMsg: err })
        }
      )
  }
}

export default new User();
