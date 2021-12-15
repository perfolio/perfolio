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
    fields.length > 0 ? this.logger.debug(message, fields) : this.logger.debug(message)
  }

  public info(message: string, ...fields: Field[]): void {
    fields.length > 0 ? this.logger.info(message, fields) : this.logger.info(message)
  }

  public warn(message: string, ...fields: Field[]): void {
    fields.length > 0 ? this.logger.warn(message, fields) : this.logger.warn(message)
  }

  public error(message: string, ...fields: Field[]): void {
    fields.length > 0 ? this.logger.error(message, fields) : this.logger.error(message)
  }
}
