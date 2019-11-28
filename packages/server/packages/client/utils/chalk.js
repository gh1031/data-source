const chalk = require('chalk');
const log = console.log;
const STR_COLOR = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray']

const colorLog = (str, color) => {
  try {
    if (!STR_COLOR.includes(color)) {
      throw Error('please use valide color!')
    }
    if (!str) {
      throw Error('invalide string')
    }
    log(chalk[color](str))
  } catch(e) {
    chalk.red(e)
  }
}
const randomColorLog = () => {
  const randomIndex = Math.floor(Math.random() * STR_COLOR.length);
  const randomColor = STR_COLOR[randomIndex];
  try {
    log(chalk[randomColor](str))
  } catch(e) {
    chalk.red(e)
  }

}

module.exports = {
  colorLog,
  randomColorLog,
}