import {
  withMiddleware,
  getTransactionApiHandler,
  GetTransactionsRequestValidation,
} from '@perfolio/api';

export default withMiddleware(getTransactionApiHandler, GetTransactionsRequestValidation);
