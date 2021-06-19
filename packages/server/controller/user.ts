import Base from './base';
import userService from '../services/user';
import query from '../db/init/pool';
import { queryAllUser, queryById } from '../db/user';

const ONE_DAY = 24 * 60 * 60 * 1000;
class User extends Base{
  /**
   * 
   * @param {Context} ctx 
   * @description 注册模块
   */
  async register(ctx) {
    const { body } = ctx.request;
    try {
      const res = await userService.register(body);
      if (res.serverStatus === 2) {
        ctx.body = this.return({ data: true, message: '注册成功' })
      } else {
        ctx.body = this.return({ code: '1', data: false, errorMsg: '注册失败' })
      }
    } catch(e) {
      ctx.body = this.return({ code: '1', message: e });
    }
  }

  /**
   * 
   * @param {Object} ctx 
   * @description 登录模块
   */
  async login(ctx) {
    const { body } = ctx.request;
    const { name, password } = (body || {});
    if (!name || !password) {
      return ctx.body = this.return({ data: false, errorMsg: '账号或密码为空' })
    }

    const res = await userService.login({ name, password });

    if (res.length > 0) {
      return ctx.body = this.return({ data: res });
    }
    return ctx.body = this.return({ errorMsg: '用户不存在' })
  }

  /**
   * @description 查询所有用户
   */
  async queryAllUser(ctx) {
    const users = await query(queryAllUser);
    ctx.body = this.return({ data: users });
  }

  /**
   * @description 根据id查询
   */
  async queryUserById(ctx) {
    console.log(ctx.path)
    const { query: params } = ctx;
    console.log(params)
    const user = await query(queryById, [params.id]);
    ctx.body = this.return({ data: user});
  }
}

export default new User();
