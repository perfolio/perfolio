import { CreateCollection } from 'faunadb';
import { Symbol } from '../../lib/documents/symbol';
export default CreateCollection({ name: Symbol.collection, ttl_days: 30 });
