import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'src/utils/axios';
import './index.scss';

interface Props {};

const Login: FC<Props> = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ name, password });
    const res = await axios.post('/user/login', { name, password })
    console.log(res, 'res');
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="name">
            <span>用户名：</span>
            <input
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div className="form-item">
          <label htmlFor="password">
            <span>密码：</span>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <div className="form-item">
          {/* <button id="submit" onClick={handleSubmit}>登录</button> */}
          <input className="submit" type="submit" value="登录"/>
          <Link to="register">
            <button>去注册</button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login;
