import { Prisma } from "./prisma"
import { IEX } from "./iex"

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
