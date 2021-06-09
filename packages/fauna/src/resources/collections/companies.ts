import { CreateCollection } from "faunadb"
import { Company } from "@perfolio/fauna"
export default CreateCollection({ name: Company.collection, ttl_days: 30 })
