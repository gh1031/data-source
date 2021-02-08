import chalk from 'chalk';

const consoles = Object.keys(console);

type FrontColor = 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'grey'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright'
type BackColor = 'bgBlack'
  | 'bgRed'
  | 'bgGreen'
  | 'bgYellow'
  | 'bgBlue'
  | 'bgMagenta'
  | 'bgCyan'
  | 'bgWhite'
  | 'bgBlackBright'
  | 'bgRedBright'
  | 'bgGreenBright'
  | 'bgYellowBright'
  | 'bgBlueBright'
  | 'bgMagentaBright'
  | 'bgCyanBright'
  | 'bgWhiteBright'


const logger = consoles.reduce((result, method) => ({
  ...result, 
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  [method](color: FrontColor | BackColor, ...args: any[]) {
    const fn = console[method];
    if (fn) {
      fn(chalk[color](...args))
    }
  }
}), {} as Console)

export default logger;
