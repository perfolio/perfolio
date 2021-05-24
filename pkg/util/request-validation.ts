import { NextApiRequest } from "next"
/**.
 * Validate that the content-type and that all necessary fields are set by the user
 * @param req - The incoming request.
 * @param fields - An array of field names that are required
 * @returns A message for the user and whether or not the request is valid.
 */
export function validateRequest(
  req: NextApiRequest,
  fields: string[],
): [string, boolean] {
  if (req.method === "POST") {
    if (req.headers["content-type"] !== "application/json") {
      return [`"Content-Type must be "application/json"`, false]
    }

    for (const field of fields) {
      if (typeof req.body[field] === "undefined" || req.body[field] === "") {
        return [`"${field}" must be defined`, false]
      }
    }

    return ["", true]
  }

  if (req.method === "GET") {
    for (const field of fields) {
      if (typeof req.query[field] === "undefined" || req.query[field] === "") {
        return [`"${field}" must be defined`, false]
      }
    }

    return ["", true]
  }

  return ["Wrong method type", false]
}
