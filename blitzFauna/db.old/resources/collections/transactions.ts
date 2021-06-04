import { CreateCollection } from "faunadb"

export const COLLECTION_TRANSACTIONS = "transactions"
export default CreateCollection({ name: COLLECTION_TRANSACTIONS })
