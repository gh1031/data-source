import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { routerDom } from 'src/routes';

interface Props {};

const Aside: FC<Props> = () => {
  return (
    <ul>
      {routerDom.map(r => <NavLink to={r.path} key={r.path}><li>{r.path}</li></NavLink>)}
    </ul>
  )
}

export default Aside;
