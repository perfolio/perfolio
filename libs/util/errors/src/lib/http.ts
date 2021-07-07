import { GenericError } from "./error"

export class HTTPError extends GenericError {
  constructor(status: number, resource: string) {
    super("HTTPError", `Unable to reach resource "${resource}": status = ${status}`, {})
  }
}
