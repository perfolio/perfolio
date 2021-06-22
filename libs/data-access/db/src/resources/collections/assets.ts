import { CreateCollection } from "faunadb"
import { Asset } from "../../lib/documents/asset"
export default CreateCollection({ name: Asset.collection, ttl_days: 30 })
