export default {
  host      : 'localhost',
  port      : 3306,
  database  : 'nodesql',
  user      : 'root',
  password  : '123456',
  acquireTimeout: 15000, // 连接超时时间
  connectionLimit: 100, // 最大连接数
  waitForConnections: true, // 超过最大连接时排队
  queueLimit: 0, // 排队最大数量(0 代表不做限制)
}
