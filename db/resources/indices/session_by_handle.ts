import { Collection, CreateIndex } from "faunadb"
import { Session } from "db"

export default CreateIndex({
  name: Session.index.byHandle,
  source: Collection(Session.collection),
  terms: [
    {
      field: ["data", "handle"],
    },
  ],
  unique: true,
  serialized: true,
})
