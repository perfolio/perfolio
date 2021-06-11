import { Collection, CreateIndex } from "faunadb"
import { Asset } from "../../lib/documents/asset"

export default CreateIndex({
  name: Asset.index.byIsin,
  source: Collection(Asset.collection),
  terms: [
    {
      field: ["data", "isin"],
    },
  ],
  unique: true,
  serialized: true,
})
