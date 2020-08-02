export const userTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    avator VARCHAR(200) COMMENT '头像',
    gmt_create VARCHAR(20) COMMENT '注册时间',
    PRIMARY KEY (id)
  );
`
