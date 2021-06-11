import { CreateCollection } from "faunadb"
import { Price } from "../../lib/documents/price"
export default CreateCollection({ name: Price.collection, ttl_days: 30 })
