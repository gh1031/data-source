import { hot } from 'react-hot-loader/root';
import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from 'src/views/Layout';
import Register from 'src/views/Register';
import Login from 'src/views/Login';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/">
          <Layout />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App);
