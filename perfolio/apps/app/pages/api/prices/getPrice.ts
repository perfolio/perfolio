import {
  withMiddleware,
  getPriceApiHandler,
  GetPriceRequestValidation,
} from '@perfolio/api';

export default withMiddleware(getPriceApiHandler, GetPriceRequestValidation);
