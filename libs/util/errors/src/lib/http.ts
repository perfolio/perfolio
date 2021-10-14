import { GenericError } from "./error"

export class HttpError extends GenericError {
  public readonly status: number
  constructor(status: number, message?: string) {
    super("HttpError", `${message}: status = ${status}, ${message}`, {})
    this.status = status
  }
}
