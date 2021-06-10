import {
  withMiddleware,
  getCompanyApiHandler,
  GetCompanyRequestValidation,
} from '@perfolio/api';

export default withMiddleware(getCompanyApiHandler, GetCompanyRequestValidation);
