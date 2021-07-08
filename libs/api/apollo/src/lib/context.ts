import { DataSources } from "./datasources";

export type Context = {
    dataSources : DataSources
    user: {
        id: string
    } | null
}