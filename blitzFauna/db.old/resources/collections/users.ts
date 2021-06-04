import { CreateCollection } from "faunadb"

export const COLLECTION_USERS = "users"
export default CreateCollection({ name: COLLECTION_USERS })
