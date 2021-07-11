export class HTTPRequestError extends Error {
  name = "HTTPRequestError"
  constructor(message = "Unable to request resource") {
    super(message)
  }
}

export class JsonUnmarshalError extends Error {
  name = "JsonUnmarshalError"
  constructor(err: Error) {
    super(`Unable to unmarshal json: ${err}`)
  }
}

export class AuthenticationError extends Error {
  name = "AuthenticationError"
  constructor(reason: string) {
    super(`Unable to authenticate user: ${reason}`)
  }
}
