import { Collection, CreateIndex } from "faunadb"
import { Account } from "../../lib/documents/account"

export default CreateIndex({
  name: Account.index.byProviderAccountId,
  source: Collection(Account.collection),
  unique: true,
  serialized: true,
  terms: [{ field: ["data", "providerId"] }, { field: ["data", "providerAccountId"] }],
})
