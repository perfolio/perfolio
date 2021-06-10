import {NextApiHandler,NextApiRequest,NextApiResponse} from "next"
import {Claims, JWT} from "@perfolio/auth"
import {z} from "zod"
export function withMiddleware<REQ,RES>(handler: (req: REQ, claims?: Claims) => RES, reqValidator: z.AnyZodObject): NextApiHandler {
  return async (nextReq: NextApiRequest, nextRes: NextApiResponse<RES>): Promise<void> => {
    /**
     * For simplicity all request will be POST.
     */
    if (nextReq.method.toLowerCase() !== "post") {
      nextRes.status(405)
      nextRes.end("This endpoint only accepts post requests")
      return
    }

    /**
     * If content-type is not application/json the request body would be a string.
     * This way we do not have to unmarshal it ourselves because next has already done it.
     */
    if (nextReq.headers['content-type'] !== "application/json"){
      nextRes.status(400)
      nextRes.end("Content type must be application/json")
      return
    }

    /**
     * Check token is in header
     */
    const jwt = nextReq.headers.authorization
    if (!jwt) {
      nextRes.status(401)
      nextRes.end("Not authorized: Authorization header missing")
      return
    }

    /**
     * Validate token
     */
    let claims:Claims
    try {
      claims = JWT.verify(jwt)
    } catch(err) {
      nextRes.status(401)
      nextRes.end(`Unauthorized: ${err}`)
      return
    }

    /**
     * Validate request body
     */
    let req: REQ
    try{
     req = reqValidator.parse(nextReq.body) as REQ
    } catch(err){
      nextRes.status(400)
      nextRes.end(`Unauthorized: ${err}`)
      return
    }

    try {
      const res = await handler(req, claims)
      nextRes.json(res)
      nextRes.end()
    } catch(err){
      console.error(err)
      nextRes.status(500)
      nextRes.end(err)
    }

  }

}
