import { CreateCollection } from 'faunadb';
import { Transaction } from '../../lib/documents/transaction';
export default CreateCollection({ name: Transaction.collection });
