import { BrowserRouter, Route, RouteProps } from 'react-router-dom';
import Organization from 'src/views/Company/Organization';
import Employee from 'src/views/Company/Employee';
import RegexpREPL from 'src/views/RegexpREPL';


export const routerDom = [{
  path: '/organization',
  component: Organization,
}, {
  path: '/employee',
  component: Employee,
}, {
  path: '/regexp-repl',
  component: RegexpREPL
}];

export const routerConfig = []
