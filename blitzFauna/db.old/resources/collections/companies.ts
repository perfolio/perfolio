import { CreateCollection } from "faunadb"

export const COLLECTION_COMPANIES = "companies"
export default CreateCollection({ name: COLLECTION_COMPANIES })
