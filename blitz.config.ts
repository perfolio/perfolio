import { Time } from "app/time"
import { sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
import { db } from "db"
import slugify from "slugify"

const cookiePrefix = `blitz-fauna-example-${slugify(
  process.env.VERCEL_GIT_COMMIT_REF ?? "dev",
)}`
console.log({ cookiePrefix })

module.exports = {
  middleware: [
    sessionMiddleware({
      cookiePrefix,
      isAuthorized: simpleRolesIsAuthorized,
      getSession: async (handle) => {
        const session = await db.session.fromHandle(handle)

        if (!session) return null
        return {
          ...session.data,
          expiresAt: session.data.expiresAt
            ? Time.fromTimestamp(session.data.expiresAt).toDate()
            : undefined,
        }
      },
      // getSessions: (userId) => getDb().session.findMany({ where: { userId } }),
      createSession: async (existingSession) => {
        const session = await db.session.create({
          ...existingSession,
          userId: existingSession.userId!,
          expiresAt: existingSession.expiresAt
            ? Time.fromDate(existingSession.expiresAt).unix()
            : undefined,
        })

        return {
          ...session.data,
          expiresAt: session.data.expiresAt
            ? Time.fromTimestamp(session.data.expiresAt).toDate()
            : undefined,
        }
      },
      updateSession: async (sessionHandle, update) => {
        const session = await db.session.fromHandle(sessionHandle)

        const updatedSession = await db.session.update(session!, {
          ...update,
          expiresAt: update.expiresAt
            ? Time.fromDate(update.expiresAt).unix()
            : undefined,
        })

        return {
          ...updatedSession!.data,
          expiresAt: updatedSession!.data.expiresAt
            ? Time.fromTimestamp(updatedSession!.data.expiresAt).toDate()
            : undefined,
        }
      },
      deleteSession: async (handle) => {
        const session = await db.session.fromHandle(handle)

        if (!session) {
          return null as any
        }
        await db.session.delete(session)

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
