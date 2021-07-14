import { Fauna } from "./fauna"
import { IEX } from "./iex"
import { OpenFigi } from "./openfigi"
import { Sendgrid } from "./sendgrid"

export type DataSources = {
  iex: IEX
  sendgrid: Sendgrid
  fauna: Fauna
  openFigi: OpenFigi
}

export const dataSources = (): DataSources => {
  return {
    iex: new IEX(),
    sendgrid: new Sendgrid(),
    fauna: new Fauna(),
    openFigi: new OpenFigi(),
  }
}
