import { Collection, CreateIndex } from "faunadb"
import { Price } from "db"

export default CreateIndex({
  name: Price.index.bySymbol,
  source: Collection(Price.collection),
  terms: [
    {
      field: ["data", "symbol"],
    },
  ],
  values: [
    { field: ["data", "symbol"] },
    { field: ["data", "time"] },
    {
      field: ["data", "value"],
    },
  ],
  unique: false,
  serialized: true,
})
