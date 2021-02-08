import React, { FC, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'src/utils/axios';
import '../Login/index.scss';

interface Props {};
interface FormField {
  name: string;
  password: string;
  email: string;
  nick: string;
  level: number;
}

const Register: FC<RouteComponentProps> = ({ history }) => {
  const [form, setForm] = useState<FormField>({
    name: '',
    password: '',
    email: '',
    nick: '',
    level: 1,
  });
  
  function handleChange(e) {
    const type = e.target.name;
    const value = e.target.value;
    setForm(state => ({ ...state, [type]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post('/user/register', form);
    console.log(form, res);
    history.push('/login');
  }
  
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label title="用户名">
            <span>用户名：</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} />
          </label>
        </div>
        <div className="form-item">
          <label title="别名">
            <span>别名：</span>
            <input type="text" name="nick" value={form.nick} onChange={handleChange} />
          </label>
        </div>
        <div className="form-item">
          <label title="密码">
            <span>密码：</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} />
          </label>
        </div>
        <div className="form-item">
          <label title="邮箱">
            <span>邮箱：</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
          </label>
        </div>
        <div className="form-item">
          <label title="级别">
            <span>级别：</span>
            <input type="number" name="level" value={form.level} onChange={handleChange} />
          </label>
        </div>
        <div className="form-item">
          <input className="submit" type="submit" value="注册" />
          <Link to="/login">
            <button>去登录</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
