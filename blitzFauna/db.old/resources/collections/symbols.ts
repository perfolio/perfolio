import { CreateCollection } from "faunadb"

export const COLLECTION_SYMBOLS = "symbols"
export default CreateCollection({ name: COLLECTION_SYMBOLS })
