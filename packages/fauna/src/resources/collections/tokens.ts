import { CreateCollection } from "faunadb"
import { Token } from "@perfolio/fauna"
export default CreateCollection({ name: Token.collection, ttl_days: 30 })
