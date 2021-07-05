import { CreateCollection } from "faunadb"
import { Session } from "../../lib/documents/session"
export default CreateCollection({ name: Session.collection, ttl_days: 30 })
