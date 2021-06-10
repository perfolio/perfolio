import { CreateCollection } from 'faunadb';
import { User } from '../../lib/documents/user';
export default CreateCollection({ name: User.collection });
