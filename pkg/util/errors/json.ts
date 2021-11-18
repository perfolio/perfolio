import { GenericError, } from "./error"
export class JsonUnmarshalError extends GenericError {
  constructor(err: Error,) {
    super("JsonUnmarshalError", `Unable to unmarshal json: ${err}`, {},)
  }
}
