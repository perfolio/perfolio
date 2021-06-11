import { CreateIndex, Collection } from "faunadb"
import { RefreshToken } from "../../lib/documents/refresh_token"
export default CreateIndex({
  name: RefreshToken.index.byUserId,
  source: Collection(RefreshToken.collection),
  terms: [
    {
      field: ["data", "userId"],
    },
  ],
  unique: false,
  serialized: true,
})
