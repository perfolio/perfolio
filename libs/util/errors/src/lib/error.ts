import { Logger } from "tslog"
export interface ErrorOptions {
  /**
   * Log the error.
   *
   * @defaults no logging
   */
  logLevel?: "debug" | "info" | "warn" | "error"

  /**
   * Provide a function to render custom user facing errors for different
   * languages or whatever you want.
   *
   *
   * The result will be returned by `error.publicMessage`
   *
   * @param errorCode Receives the error code as argument.
   * @defaults The error name will be returned..
   */
  getPublicMessage?: (errorCode: string) => string
}

export abstract class GenericError extends Error {
  private getPublicMessage?: (errorCode: string) => string

  constructor(name: string, message: string, { logLevel, getPublicMessage }: ErrorOptions) {
    super(message)
    this.name = name

    const logger = new Logger({
      name,
    })

    switch (logLevel) {
      case "debug":
        logger.debug(message)
        break
      case "info":
        logger.info(message)
        break
      case "warn":
        logger.warn(message)
        break
      case "error":
        logger.error(message)
        break
    }

    this.getPublicMessage = getPublicMessage
  }

  public get publicMessage(): string {
    return this.getPublicMessage ? this.getPublicMessage(this.name) : this.message
  }
}
