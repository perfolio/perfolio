import { DataSourceIEX } from "./iex"

export type DataSources = {
  iex: DataSourceIEX
}

export const dataSources = (): DataSources => {
  return {
    iex: new DataSourceIEX(),
  }
}
