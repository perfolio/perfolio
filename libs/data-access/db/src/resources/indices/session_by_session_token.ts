import { Collection, CreateIndex } from "faunadb"
import { Session } from "../../lib/documents/session"

export default CreateIndex({
  name: Session.index.bySessionToken,
  source: Collection(Session.collection),
  terms: [
    {
      field: ["data", "sessionToken"],
    },
  ],
  unique: true,
  serialized: true,
})
