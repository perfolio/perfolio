import { Prisma } from "./prisma"
import { IEX } from "./iex"
import { OpenFigi } from "./openfigi"
import { Sendgrid } from "./sendgrid"

export type DataSources = {
  iex: IEX
  sendgrid: Sendgrid
  prisma: Prisma
  openFigi: OpenFigi
}

export const dataSources = (): DataSources => {
  return {
    iex: new IEX(),
    sendgrid: new Sendgrid(),
    prisma: new Prisma(),
    openFigi: new OpenFigi(),
  }
}
