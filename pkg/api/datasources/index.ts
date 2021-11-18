import { DB } from "./db"
import { IEX } from "./iex"

export type DataSources = {
  db: DB
  iex: IEX
}

export const dataSources = (): DataSources => {
  return {
    db: new DB(),
    iex: new IEX(),
  }
}
