import React from 'react';
import ReactDom from 'react-dom';

// for react hot reload
// import 'react-refresh/runtime';
import App from './App';
import 'src/styles/global.scss';

const ws = new WebSocket('ws://127.0.0.1:8888');
ws.onopen = function (evt) {
  console.log(evt);
}
ws.onmessage = function (evt) {
  console.log(evt, 'message')
  ws.send('hello server')
}

ReactDom.render(<App />, document.getElementById('root'));
