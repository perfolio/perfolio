import { CreateCollection } from "faunadb"

export const COLLECTION_SESSIONS = "sessions"
export default CreateCollection({ name: COLLECTION_SESSIONS })
