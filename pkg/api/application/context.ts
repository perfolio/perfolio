import { DataSources } from "./datasources"
import { IncomingMessage } from "http"

export type Context = {
  dataSources: DataSources
}

export const context = (ctx: { req: IncomingMessage }) => {
  return {
    ...ctx,
  }
}
