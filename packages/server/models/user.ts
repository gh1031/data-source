import query from '../db';

function now() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}
export default {
  async register({ name, nick, password, email, level }) {
    const _sql = `
      INSERT INTO user
      (name, nick, password, email, level, create_time)
      VALUES
      ("${name}", "${nick}", "${password}", "${email}", ${level}, "${now()}")
    `
    return query(_sql)
  },
  
  async login({ name, password}) {
    const data = await query(
      `
        SELECT id, name
        FROM user
        WHERE name = ? and password = ?
        LIMIT 1
      `,
      [name, password]
    )
    return data;
  }
}
