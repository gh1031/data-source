export const isUserExist = (name: string) => `SELECT name FROM users WHERE name="${name}"`;

export const isThisUser = `SELECT * FROM users WHERE name=? AND password=?`
