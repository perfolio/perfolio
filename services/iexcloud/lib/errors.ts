export class ErrIsinNotFound extends Error {
  constructor(message: string) {
    super(message)
  }
}
/**
 * You did not send a token with your iex request.
 */
export class ErrTokenNotFound extends Error {
  constructor() {
    super("Token must not be empty")
  }
}

/**
 * Your request seems to be valid but iex returned no data, indicating your parameters are not correct.
 */
export class ErrIEXReturnedNoData extends Error {
  constructor(message?: string) {
    super(`IEX cloud returned no data for: ${message}`)
  }
}
