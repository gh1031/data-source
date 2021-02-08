import checkLogin from '@/middleware/checkLogin';
import userModel from '../models/user';

export default {
  async register(data) {
    const { name, password } = data;
    if (!name || !password) {
      return Promise.reject('用户名或密码不能为空');
    }
    return userModel.register(data);
  },
  
  async login({ name, password }) {
    return await userModel.login({ name, password });
  }
}
