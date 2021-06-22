import { CreateCollection } from "faunadb"
import { Account } from "../../lib/documents/account"
export default CreateCollection({ name: Account.collection })
