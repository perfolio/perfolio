import { withContentTypeJson, use, withAuthentication } from "@perfolio/api/feature/middleware"
import { deleteAccount } from "@perfolio/api/feature/lambda"

export default use(deleteAccount, [withContentTypeJson, withAuthentication])
