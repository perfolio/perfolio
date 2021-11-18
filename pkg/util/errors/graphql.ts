import { GenericError, } from "./error"

export class GraphqlError extends GenericError {
  public readonly errors: string[]
  constructor(errors: string[],) {
    super("GraphqlError", `Errors during graphql: ${JSON.stringify(errors, null,)}`, {},)
    this.errors = errors
  }
}
