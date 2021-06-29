import { CreateIndex, Collection } from "faunadb"
import { Settings } from "../../lib/documents/settings"
export default CreateIndex({
  name: Settings.index.byUserId,
  source: Collection(Settings.collection),
  terms: [
    {
      field: ["data", "userId"],
    },
  ],
  unique: true,
  serialized: true,
})
