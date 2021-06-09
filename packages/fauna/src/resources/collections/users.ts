import { CreateCollection } from "faunadb"
import { User } from "@perfolio/fauna"
export default CreateCollection({ name: User.collection })
