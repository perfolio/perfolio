import { GenericError, } from "./error"

export class AuthenticationError extends GenericError {
  /**
   * @param reason - Why you could not authenticate the user
   */
  constructor(reason: string,) {
    super("AuthenticationError", `Unable to authenticate user: ${reason}`, {
      logLevel: "warn",
    },)
  }
}

export class AuthorizationError extends GenericError {
  /**
   * @param reason - Why the user is not allowed to do this
   */
  constructor(reason: string,) {
    super("AuthorizationError", `You are not allowed to do this: ${reason}`, {
      logLevel: "error",
    },)
  }
}
