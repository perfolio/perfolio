import { CreateCollection } from "faunadb"
import { Settings } from "../../lib/documents/settings"
export default CreateCollection({ name: Settings.collection })
