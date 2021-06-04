import { CreateCollection } from "faunadb"
import {Transaction} from "db"
export default CreateCollection({ name: Transaction.collection })
