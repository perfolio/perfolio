import { signin } from "@perfolio/lambda"

import { use, allowCors } from "@perfolio/middleware"

export default use(signin, [allowCors])
