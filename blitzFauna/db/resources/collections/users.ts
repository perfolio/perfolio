import { CreateCollection } from "faunadb"
import {User} from "db"
export default CreateCollection({ name: User.collection })
