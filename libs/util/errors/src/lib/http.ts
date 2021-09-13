import { GenericError } from "./error"

export class HTTPError extends GenericError {
  public readonly status: number
  constructor(status: number, message?: string) {
    super("HTTPError", `${message}: status = ${status}, ${message}`, {})
    this.status = status
  }
}
