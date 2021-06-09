import { CreateCollection } from "faunadb"
import { Symbol } from "db"
export default CreateCollection({ name: Symbol.collection, ttl_days: 30 })
