import { Collection, CreateIndex } from "faunadb"
import { COLLECTION_SESSIONS } from "../collections/sessions"
export const INDEX_SESSION_BY_HANDLE = "session_by_handle"

export default CreateIndex({
  name: INDEX_SESSION_BY_HANDLE,
  source: Collection(COLLECTION_SESSIONS),
  terms: [
    {
      field: ["data", "handle"],
    },
  ],
  unique: true,
  serialized: true,
})
