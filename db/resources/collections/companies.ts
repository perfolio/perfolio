import { CreateCollection } from "faunadb"
import { Company } from "db"
export default CreateCollection({ name: Company.collection, ttl_days: 30 })
