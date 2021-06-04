import { CreateCollection } from "faunadb"

export const COLLECTION_PRICES = "prices"
export default CreateCollection({ name: COLLECTION_PRICES })
