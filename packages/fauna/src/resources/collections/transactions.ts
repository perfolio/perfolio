import { CreateCollection } from "faunadb"
import { Transaction } from "@perfolio/fauna"
export default CreateCollection({ name: Transaction.collection })
