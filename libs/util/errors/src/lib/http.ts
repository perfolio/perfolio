import { GenericError } from "./error"

export class HTTPError extends GenericError {
  public readonly status: number
  constructor(status: number, resource: string, message?: string) {
    super("HTTPError", `Unable to reach resource "${resource}": status = ${status}, ${message}`, {})
    this.status = status
  }
}
