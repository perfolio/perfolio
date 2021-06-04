import { Collection, CreateRole, Index } from "faunadb"
import {
  COLLECTION_SESSIONS,
  COLLECTION_USERS,
  INDEX_SESSION_BY_HANDLE,
  INDEX_USER_BY_EMAIL,
} from "db"

export default CreateRole({
  name: "authenticated",
  membership: [
    {
      resource: Collection(COLLECTION_USERS),
    },
  ],
  // allow all for now
  privileges: [
    ...[COLLECTION_USERS, COLLECTION_SESSIONS].map((collection) => {
      return {
        resource: Collection(collection),
        actions: {
          read: true,
          write: true,
          create: true,
          delete: true,
          history_read: false,
          history_write: false,
          unrestricted_read: false,
        },
      }
    }),

    ...[INDEX_SESSION_BY_HANDLE, INDEX_USER_BY_EMAIL].map((index) => {
      return {
        resource: Index(index),
        actions: {
          read: true,
          write: true,
          create: true,
          delete: true,
          history_read: false,
          history_write: false,
          unrestricted_read: false,
        },
      }
    }),
  ],
})
