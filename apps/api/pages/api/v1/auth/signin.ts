import { signin } from "@perfolio/lambda"

import { use, withCors } from "@perfolio/middleware"

export default use(signin, [withCors("https://app.perfol.io")])
