import { CreateCollection } from "faunadb"
import { RefreshToken } from "../../lib/documents/refresh_token"
export default CreateCollection({ name: RefreshToken.collection, ttl_days: 7 })
