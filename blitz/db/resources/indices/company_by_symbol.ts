import { Collection, CreateIndex } from "faunadb"
import { Company } from "db"

export default CreateIndex({
  name: Company.index.bySymbol,
  source: Collection(Company.collection),
  terms: [
    {
      field: ["data", "symbol"],
    },
  ],
  unique: true,
  serialized: true,
})
