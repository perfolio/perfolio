import { sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
import { Session, SessionDocument } from "db"
const faunaToken = process.env.FAUNA_SERVER_KEY!

const normalizeSession = (faunaSession) => {
  if (!faunaSession) return null
  const { user, expiresAt, ...rest } = faunaSession
  return {
    ...rest,
    userId: user.id,
    expiresAt: new Date(expiresAt),
  }
}

module.exports = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "blitz-fauna-example",
      isAuthorized: simpleRolesIsAuthorized,
      getSession: async (handle) => {
        const session = await SessionDocument.fromHandle(handle, faunaToken)
        if (!session) return null
        const { user, ...rest } = session.data
        return {
          ...rest,
          userId: user.guid(),
        }
      },
      // getSessions: (userId) => getDb().session.findMany({ where: { userId } }),
      createSession: async (session: Session) => {
        const { user, ...sessionInput } = session
        const sessionRes = await SessionDocument.create(
          {
            ...sessionInput,
            userId: user.id(),
          },
          faunaToken,
        )

        return normalizeSession(sessionRes)
      },
      updateSession: async (sessionHandle, existingSession) => {
        const session = await SessionDocument.fromHandle(
          sessionHandle,
          faunaToken,
        )
        await session.update(existingSession)

        return normalizeSession(session.data)
      },
      deleteSession: async (handle) => {
        const session = await SessionDocument.fromHandle(handle, faunaToken)
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
