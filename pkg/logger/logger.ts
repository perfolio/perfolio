import { Logger as TsLogger } from "tslog"

export type Field = Record<string, unknown>

export type LoggerConfig = {
  name?: string
}

export class Logger {
  private logger: TsLogger

  public constructor(config?: LoggerConfig) {
    this.logger = new TsLogger({
      name: config?.name,
    })
  }

  public debug(message: string, ...fields: Field[]): void {
    this.logger.debug(message, fields)
  }

  public info(message: string, ...fields: Field[]): void {
    this.logger.info(message, fields)
  }

  public warn(message: string, ...fields: Field[]): void {
    this.logger.warn(message, fields)
  }

  public error(message: string, ...fields: Field[]): void {
    this.logger.error(message, fields)
  }
}
