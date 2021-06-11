import { CreateCollection } from "faunadb"
import { Company } from "../../lib/documents/company"
export default CreateCollection({ name: Company.collection, ttl_days: 30 })
