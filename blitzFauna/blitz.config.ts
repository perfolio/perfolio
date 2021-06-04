import { sessionMiddleware, SessionModel, simpleRolesIsAuthorized } from "blitz"
import { Session, fauna } from "db"



module.exports = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "blitz-fauna-example",
      isAuthorized: simpleRolesIsAuthorized,
      getSession: async (handle) => {
        const session = await fauna.session.fromHandle(handle)
        if (!session) return null
        return session.data
      },
      // getSessions: (userId) => getDb().session.findMany({ where: { userId } }),
      createSession: async (existingSession) => {


        const { userId, ...sessionInput } = existingSession


        const session = await fauna.session.create({
          ...sessionInput,
          userId: userId!,
        })


        return session.data
      },
      updateSession: async (sessionHandle, update) => {
        const session = await fauna.session.fromHandle(sessionHandle)

        await fauna.session.update(session!, update)
        return session!.data
      },
      deleteSession: async (handle) => {


        const session = await fauna.session.fromHandle(handle)
      
        if (!session) {
          return null as any
        }
        await fauna.session.delete(session)
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
