import { Collection, CreateIndex } from "faunadb"
import { COLLECTION_SYMBOLS } from "../collections/symbols"
export const INDEX_SYMBOL_BY_ISIN = "symbol_by_isin"

export default CreateIndex({
  name: INDEX_SYMBOL_BY_ISIN,
  source: Collection(COLLECTION_SYMBOLS),
  terms: [
    {
      field: ["data", "isin"],
    },
  ],
  unique: true,
  serialized: true,
})
