const app = require('../app')
const ServerConf = require('../config/server.conf')

app.listen(ServerConf.PORT, ServerConf.HOST, () => {
  console.log(`server is running at http://${ServerConf.HOST}:${ServerConf.PORT}`)
})
