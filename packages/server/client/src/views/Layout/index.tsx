import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { routerDom } from 'src/routes';
import Aside from './Aside';
import './index.scss';

interface Props {};

const AppLayout: FC<Props> = () => {

  return (
    <section className="page-layout app">
      <header className="page-layout-header">header</header>
      <section className="page-layout page-layout-has-sider ">
        <aside className="page-layout-aside">
          <Aside />
        </aside>
        <main className="page-layout-content">
          <Switch>
            {routerDom.map(r => <Route path={r.path} key={r.path} exact component={r.component} />)}
          </Switch>
        </main>
      </section>
    </section>
  )
}

export default AppLayout;
