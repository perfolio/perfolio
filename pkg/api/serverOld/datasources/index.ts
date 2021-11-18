import { IEX, } from "./iex"
import { Prisma, } from "./prisma"

export type DataSources = {
  iex: IEX
  prisma: Prisma
}

export const dataSources = (): DataSources => {
  return {
    iex: new IEX(),
    prisma: new Prisma(),
  }
}
