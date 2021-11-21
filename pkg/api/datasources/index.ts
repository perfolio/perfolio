import { DB } from "./db"
import { IEX } from "./iex"
import { OpenFigi } from "./openFigi"

export type DataSources = {
  db: DB
  iex: IEX
  openFigi: OpenFigi
}

export const dataSources = (): DataSources => {
  return {
    db: new DB(),
    iex: new IEX(),
    openFigi: new OpenFigi(),
  }
}
