import { Collection, CreateIndex } from "faunadb"
import { Asset } from "../../lib/documents/asset"

export default CreateIndex({
  name: Asset.index.bySymbol,
  source: Collection(Asset.collection),
  terms: [
    {
      field: ["data", "symbol"],
    },
  ],
  unique: true,
  serialized: true,
})
