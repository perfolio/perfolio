import { Collection, CreateIndex } from "faunadb"
import { COLLECTION_SYMBOLS } from "../collections/symbols"
export const INDEX_SYMBOL_BY_SYMBOL = "symbol_by_symbol"

export default CreateIndex({
  name: INDEX_SYMBOL_BY_SYMBOL,
  source: Collection(COLLECTION_SYMBOLS),
  terms: [
    {
      field: ["data", "symbol"],
    },
  ],
  unique: true,
  serialized: true,
})
