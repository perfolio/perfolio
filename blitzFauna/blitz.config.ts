import { sessionMiddleware, SessionModel, simpleRolesIsAuthorized } from "blitz"
import {  SessionDocument } from "db"
const faunaToken = process.env.FAUNA_SERVER_KEY!

const normalizeSession = (session: SessionDocument):SessionModel => {
  console.log("NORMALIZE:", {session})
  const { user, ...rest } = session.data
  return {
    ...rest,
    userId: user.id(),
  }
}

module.exports = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "blitz-fauna-example",
      isAuthorized: simpleRolesIsAuthorized,
      getSession: async (handle) => {
        console.log("GET SESSION")
        const session = await SessionDocument.fromHandle(handle, faunaToken)
        if (!session) return null
        const { user, ...rest } = session.data
        return {
          ...rest,
          userId: user.guid(),
          user
        }
      },
      // getSessions: (userId) => getDb().session.findMany({ where: { userId } }),
      createSession: async (existingSession) => {
        console.log("CREATE SESSION")

        const { userId, ...sessionInput } = existingSession
        const sessionRes = await SessionDocument.create(
          {
            ...sessionInput,
            userId: userId!,
          },
          faunaToken
        ).catch((err) => {
          throw new Error(`Unable to create session: ${err}`)
        })
        console.log("created session:", {sessionRes})

        return normalizeSession(sessionRes)
      },
      updateSession: async (sessionHandle, existingSession) => {
        console.log("UPDATE SESSION")

        const session = await SessionDocument.fromHandle(sessionHandle, faunaToken)

        await session!.update(existingSession)
        return normalizeSession(session!)
      },
      deleteSession: async (handle) => {
        console.log("DELETE SESSION")

        const session = await SessionDocument.fromHandle(handle, faunaToken)
        if (!session) {
          return null as any
        }
        await session.delete()
        return session.data
      },
    }),
  ],
  images: {
    domains: ["storage.googleapis.com"],
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
