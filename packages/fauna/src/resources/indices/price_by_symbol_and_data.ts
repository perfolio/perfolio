import { Collection, CreateIndex } from "faunadb"
import { Price } from "@perfolio/fauna"

export default CreateIndex({
  name: Price.index.bySymbolAndTime,
  source: Collection(Price.collection),
  terms: [
    {
      field: ["data", "symbol"],
    },
    {
      field: ["data", "time"],
    },
  ],
  unique: true,
  serialized: true,
})
