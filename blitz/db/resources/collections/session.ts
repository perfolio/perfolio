import { CreateCollection } from "faunadb"
import { Session } from "db"
export default CreateCollection({ name: Session.collection, ttl_days: 30 })
