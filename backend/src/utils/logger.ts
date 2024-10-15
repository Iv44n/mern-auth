import pc from 'picocolors'

const info = (...args: any[]) => {
  console.log(pc.blue(pc.bold('INFO:')), ...args)
}

const error = (...args: any[]) => {
  console.error(pc.redBright(pc.bold('ERROR:')), ...args)
}

export const logger = { info, error }
