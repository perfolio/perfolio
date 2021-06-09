import { CreateCollection } from "faunadb"
import { Price } from "db"
export default CreateCollection({ name: Price.collection, ttl_days: 30 })
