import { CreateIndex, Collection } from "faunadb"
import { RefreshToken } from "../../lib/documents/refresh_token"
export default CreateIndex({
  name: RefreshToken.index.byHash,
  source: Collection(RefreshToken.collection),
  terms: [
    {
      field: ["data", "hashedToken"],
    },
  ],
  unique: true,
  serialized: true,
})
