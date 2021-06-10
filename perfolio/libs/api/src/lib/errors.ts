export class HTTPRequestError extends Error {
  name = 'HTTPRequestError';
  constructor(message = 'Unable to request resource') {
    super(message);
  }
}

export class JsonUnmarshalError extends Error {
  name = 'JsonUnmarshalError';
  constructor(err: Error) {
    super(`Unable to unmarshal json: ${err}`);
  }
}
