import { CreateCollection } from "faunadb"
import { Price } from "@perfolio/fauna"
export default CreateCollection({ name: Price.collection, ttl_days: 30 })
