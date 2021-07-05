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

    /* eslint-disable no-console */
    switch (logLevel) {
      case "debug":
        console.debug(message)
        break
      case "info":
        console.log(message)
        break
      case "warn":
        console.warn(message)
        break
      case "error":
        console.error(message)
        break
      default:
        break
    }
    /* eslint-enable no-console */

    this.getPublicMessage = getPublicMessage
  }

  public get publicMessage(): string {
    return this.getPublicMessage ? this.getPublicMessage(this.name) : this.message
  }
}
