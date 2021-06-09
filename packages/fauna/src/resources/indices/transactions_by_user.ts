import { Collection, CreateIndex } from "faunadb"
import { Transaction } from "@perfolio/fauna"

export default CreateIndex({
  name: Transaction.index.byUserId,
  source: Collection(Transaction.collection),
  terms: [
    {
      field: ["data", "userId"],
    },
  ],
  unique: false,
  serialized: true,
})
