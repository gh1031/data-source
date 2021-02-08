const getSqlContentMap = require('../util/sql-content-map');
const query = require('./pool');

const sqlContentMap = getSqlContentMap();


async function createAllTable() {
  for (let key in sqlContentMap) {
    const sqlShell = sqlContentMap[key];
    const sqlShellList = sqlShell.split(';');

    for (let [i, shell] of sqlShellList.entries()) {
      console.log(shell, 'shell')
      if (shell.trim()) {
        const result = await query(shell);
        console.log(result, 'result');
        if (result.serverStatus === 2) {
          console.log(`执行 ${key} 成功`)
        }
      }
    }
  }
  console.log('sql脚本执行结束！');
  console.log('请按 ctrl + c 键退出！');
}

createAllTable();
