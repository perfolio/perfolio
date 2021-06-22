import { MiddlewareContext } from "@perfolio/api/feature/middleware"
import jwt from "next-auth/jwt"

export type RefreshResponse = { accessToken: string }

// export default async (req, res)=>{
//     try {

//         const claims = await jwt.getToken({req, secret: process.env.NX_JWT_SIGNING_KEY})
//         console.log({claims})

//         const token = await jwt.encode({token: claims, secret: process.env.NX_JWT_SIGNING_KEY})
//         console.log({token})

//         res.json({token}).end()
//     } catch(err){
//         console.log(err)
//         res.status(500).end(err)
//     }
// }

export const refresh = async (_: void, { req }: MiddlewareContext): Promise<RefreshResponse> => {
  console.log({ cookies: req.cookies })
  const signingKey = process.env.NX_JWT_SIGNING_KEY
  if (!signingKey) {
    throw new Error("NX_JWT_SINGING_KEY must be defined")
  }
  const claims = await jwt.getToken({ req, secret: process.env.NX_JWT_SIGNING_KEY })

  if (!claims) {
    throw new Error("Unable to validate refresh token")
  }

  const accessToken = await jwt.encode({
    token: claims,
    secret: signingKey,
  })
  console.log({ accessToken })

  return { accessToken }
}
