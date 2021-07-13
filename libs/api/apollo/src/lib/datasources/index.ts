import { Fauna } from "./fauna"
import { IEX } from "./iex"
import { Sendgrid } from "./sendgrid"

export type DataSources = {
  iex: IEX
  sendgrid: Sendgrid
  fauna: Fauna
}

export const dataSources = (): DataSources => {
  return {
    iex: new IEX(),
    sendgrid: new Sendgrid(),
    fauna: new Fauna(),
  }
}
