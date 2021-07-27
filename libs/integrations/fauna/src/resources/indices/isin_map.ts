import { CreateIndex, Collection } from "faunadb"
import { IsinMap } from "../../lib/documents/isin-map"
export default CreateIndex({
  name: IsinMap.index.all,
  source: Collection(IsinMap.collection),
  unique: true,
  serialized: true,
})
