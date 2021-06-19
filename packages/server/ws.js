const WebSocket = require('ws');

const server = new WebSocket.Server({
  host: 'localhost',
  port: 8888
});

// server.on("open", function open() {
//   const array = new Float32Array(5);

//   for (var i = 0; i < array.length; ++i) {
//     array[i] = i / 2;
//   }

//   // server.send(array);
//   setTimeout(() => {
//     server.send('hello')
//   }, 5000)
// });

server.on('open', function open() {
  server.send('hello client')
})



server.on('message', function message(data) {
  console.log(data, 'data from client')
})
