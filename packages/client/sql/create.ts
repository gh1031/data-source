export const user_table = `
  CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    avator VARCHAR(100) COMMENT '密码',
    gmt_create VARCHAR(100) COMMENT '注册时间',
    PRIMARY KEY (id)
  );
`
