import query from './init/pool';

export function createTable(sql: string) {
  return query(sql, []);
}


export function queryDataById(table: string, id: string) {
  const _sql = `
    SELECT *
    FROM ??
    WHERE id = ?
  `;
  return query(_sql, [table, id]);
}

export function queryDataByPage(table: string, columns: string, start: number, end: number) {
  const _sql = `
    SELECT ??
    FROM ??
    LIMIT ? , ?
  `;
  return query(_sql, [columns, table, start, end]);
}

export function insertData(table: string, values: string) {
  const _sql = `
    INSERT INTO ??
    SET ??
  `;
  return query(_sql, [table, values]);
}

export default query;
