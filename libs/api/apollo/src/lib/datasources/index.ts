import { IEX } from "./iex"
import { Sendgrid } from "./sendgrid"

export type DataSources = {
  iex: IEX
  sendgrid: Sendgrid
}

export const dataSources = (): DataSources => {
  return {
    iex: new IEX(),
    sendgrid: new Sendgrid(),
  }
}
