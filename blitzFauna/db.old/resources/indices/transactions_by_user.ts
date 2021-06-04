import { Collection, CreateIndex } from "faunadb"
import { COLLECTION_TRANSACTIONS } from "../collections/transactions"
export const INDEX_TRANSACTIONS_BY_USER = "transactions_by_user"

export default CreateIndex({
  name: INDEX_TRANSACTIONS_BY_USER,
  source: Collection(COLLECTION_TRANSACTIONS),
  terms: [
    {
      field: ["data", "userRef"],
    },
  ],
  unique: true,
  serialized: true,
})
