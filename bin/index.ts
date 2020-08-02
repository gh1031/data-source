#!/usr/bin/env 

import app from '../app';
import ServerConf from '../config/server.conf';

app.listen(ServerConf.PORT, ServerConf.HOST, () => {
  console.log(`server is running at http://${ServerConf.HOST}:${ServerConf.PORT} 🌍`)
})
