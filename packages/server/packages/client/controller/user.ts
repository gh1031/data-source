// eslint-disable-next-line no-unused-vars
import { Context } from 'koa';
import Base from './base';
import * as db from '../bootstrap/db';
import { insertUser } from '../sql/update';
import { isUserExist, isThisUser } from '../sql/query';

// const component = {
//   wrapped_menu: '/components/wrapped_menu',
//   remote_select: '/components/remote_select',
//   operation_confirm: '/components/operation_confirm',
//   wrapped_upload: '/components/wrapped_upload',
//   wrapped_form: '/components/wrapped_form',
// };

// const menus = [
//   {
//     title: 'setting',
//     path: '/setting',
//     icon: 'setting',
//     children: [
//       {
//         title: 'menu',
//         icon: 'menu',
//         path: '/setting/menu'
//       }
//     ]
//   },
//   {
//     title: 'windows',
//     path: '/windows',
//     icon: 'windows',
//   },
//   {
//     title: 'taobao',
//     path: '/taobeo',
//     icon: 'taobao',
//   },
//   {
//     title: 'components',
//     icon: 'alipay',
//     children: [
//       {
//         title: 'WrappedMenu',
//         path: component.wrapped_menu,
//         icon: 'menu',
//       },
//       {
//         title: 'RemoteSelect',
//         path: component.remote_select,
//         icon: 'select',
//       },
//       {
//         title: 'WrappedUpload',
//         path: component.wrapped_upload,
//         icon: 'upload',
//       },
//       {
//         title: 'OperationConfirm',
//         path: component.operation_confirm,
//         icon: 'question',
//       },
//       {
//         title: 'WrappedForm',
//         path: component.wrapped_form,
//         icon: 'form',
//       },
//     ],
//   },
// ]

class User extends Base{
  /**
   * 
   * @param {Context} ctx 
   * @description 注册模块
   */
  async register(ctx: Context) {
    const { query, body } = ctx.request;
    console.log(body)
    const { name, password, avator } = (query || {});
    const isExist = await db.query(isUserExist(name));

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
    })
      .then(
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
  async login(ctx: Context) {
    const { body, query } = ctx.request;
    console.log(body);
    const { name, password } = (query || {});
    await db.query(isThisUser, [name, password])
      .then(
        (result: []) => {
          if (result.length <= 0) {
            return ctx.body = this.return({ data: null, message: '账号或密码不正确，请重试！'})
          }
          ctx.body = this.return({ data: true, message: '登录成功！' })
        }, 
        err => {
          ctx.body = this.return({ errorMsg: err })
        }
      )
  }

  /**
   * 
   * @param {Object} ctx 
   * @description 获取菜单模块
   */
  // eslint-disable-next-line no-unused-vars
  async menus(_) {
    // const { body } = ctx.request;
    // await MenusModel.find(body, (err, docs) => {
    //   if(err) throw Error(`find menus error: ${err}`)
    //   ctx.body = this.returnData(0, '', {
    //     list: docs,
    //     total: null,
    //     pageNum: 1,
    //     pageSize: 20,
    //   })
    // })
  }

  /**
   * 
   * @param {Object} ctx 
   * @description 更新菜单模块
   */
  // eslint-disable-next-line no-unused-vars
  async updateMenus(_) {
    // const { body } = ctx.request;
    // if (body) {
    //   let children = null;
    //   const { pid, title, path, icon, subTitle, subPath, subIcon } = body
    //   if (pid) {
    //     await MenusModel.findByIdAndUpdate(pid, {
    //       $push: { children: {
    //         icon: subIcon,
    //         title: subTitle,
    //         path: subPath
    //       }}
    //     })
    //     ctx.body = this.returnData(0)
    //   }
    //   if (!pid) {
    //     children = [{ path: subPath, icon: subIcon, title: subTitle }]
    //     const menus = new MenusModel({
    //       title,
    //       path,
    //       icon,
    //       children,
    //     })
    //     await menus.save((err) => {
    //       if (err) {
    //         throw Error('save menu failed: ', err)
    //       }
    //     })
    //     ctx.body = this.returnData(0, '')
    //   }
    // }
  }
}

export default new User();
