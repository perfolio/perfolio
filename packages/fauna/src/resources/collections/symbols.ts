import { CreateCollection } from "faunadb"
import { Symbol } from "@perfolio/fauna"
export default CreateCollection({ name: Symbol.collection, ttl_days: 30 })
