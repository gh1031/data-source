const Base = require('./base');
const MenusModel = require('../model/menus.model');
const UserModel = require('../model/users.model');
const component = {
  wrapped_menu: '/components/wrapped_menu',
  remote_select: '/components/remote_select',
  operation_confirm: '/components/operation_confirm',
  wrapped_upload: '/components/wrapped_upload',
  wrapped_form: '/components/wrapped_form',
};

const menus = [
  {
    title: 'setting',
    path: '/setting',
    icon: 'setting',
    children: [
      {
        title: 'menu',
        icon: 'menu',
        path: '/setting/menu'
      }
    ]
  },
  {
    title: 'windows',
    path: '/windows',
    icon: 'windows',
  },
  {
    title: 'taobao',
    path: '/taobeo',
    icon: 'taobao',
  },
  {
    title: 'components',
    icon: 'alipay',
    children: [
      {
        title: 'WrappedMenu',
        path: component.wrapped_menu,
        icon: 'menu',
      },
      {
        title: 'RemoteSelect',
        path: component.remote_select,
        icon: 'select',
      },
      {
        title: 'WrappedUpload',
        path: component.wrapped_upload,
        icon: 'upload',
      },
      {
        title: 'OperationConfirm',
        path: component.operation_confirm,
        icon: 'question',
      },
      {
        title: 'WrappedForm',
        path: component.wrapped_form,
        icon: 'form',
      },
    ],
  },
]

class User extends Base{
  constructor() {
    super()
  }
  /**
   * 
   * @param {Object} ctx 
   * @description 注册模块
   */
  async registry(ctx) {
    const { body } = ctx.request;
    const { username, password } = (body || {});
    if (username && password) {
      await UserModel.find({ username }).then(async docs => {
        if (docs.length) {
          ctx.body = this.returnData(1, '用户已存在')
        } else {
          const user = new UserModel()
          user.username = username
          user.password = password
          await user.save()
          ctx.body = this.returnData(0)
        }
      })
    }
  }

  /**
   * 
   * @param {Object} ctx 
   * @description 登录模块
   */
  async login(ctx) {
    const { body } = ctx.request;
    const { username, password } = (body || {});
    if (username && password ) {
      await UserModel.find({ username }).then(async docs => {
        console.log(docs)
        if (docs.length) {
          if (docs[0].password === password) {
            ctx.body = this.returnData(0, '', { username })
          } else {
            ctx.body = this.returnData(1, '密码错误')
          }
        } else {
          ctx.body = this.returnData(1, '用户不存在')
        }
      })
    }
  }

  /**
   * 
   * @param {Object} ctx 
   * @description 获取菜单模块
   */
  async menus(ctx) {
    const { body } = ctx.request;
    await MenusModel.find(body, (err, docs) => {
      if(err) throw Error('find menus error: ', err)
      ctx.body = this.returnData(0, '', {
        list: docs,
        total: null,
        pageNum: 1,
        pageSize: 20,
      })
    })
  }

  /**
   * 
   * @param {Object} ctx 
   * @description 更新菜单模块
   */
  async updateMenus(ctx) {
    const { body } = ctx.request;
    if (body) {
      let children = null;
      const { pid, title, path, icon, subTitle, subPath, subIcon } = body
      if (pid) {
        await MenusModel.findByIdAndUpdate(pid, {
          $push: { children: {
            icon: subIcon,
            title: subTitle,
            path: subPath
          }}
        })
        ctx.body = this.returnData(0)
      }
      if (!pid) {
        children = [{ path: subPath, icon: subIcon, title: subTitle }]
        const menus = new MenusModel({
          title,
          path,
          icon,
          children,
        })
        await menus.save((err) => {
          if (err) {
            throw Error('save menu failed: ', err)
          }
        })
        ctx.body = this.returnData(0, '')
      }
    }
  }
}

module.exports = new User();
