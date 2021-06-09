import { Collection, CreateIndex } from "faunadb"
import { Company } from "@perfolio/fauna"

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
