const app = require('../app')
const ServerConf = require('../config/server.conf')

app.listen(ServerConf.PORT, ServerConf.HOST, (doc, error) => {
  console.log(`server is running at http://${ServerConf.HOST}:${ServerConf.PORT}`)
})