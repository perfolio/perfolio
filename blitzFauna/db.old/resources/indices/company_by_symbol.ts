import { Collection, CreateIndex } from "faunadb"
import { COLLECTION_COMPANIES } from "../collections/companies"
export const INDEX_COMPANY_BY_SYMBOL = "company_by_symbol"

export default CreateIndex({
  name: INDEX_COMPANY_BY_SYMBOL,
  source: Collection(COLLECTION_COMPANIES),
  terms: [
    {
      field: ["data", "symbol"],
    },
  ],
  unique: true,
  serialized: true,
})
