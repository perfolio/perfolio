import { Table } from "./table"
import { Text } from "../text/text"
export default {
  title: "Surfaces/Table",
  component: Table,
}

export const Default = () => (
  <Table<"col1" | "col2">
    columns={[
      {
        Header: "col1",
        accessor: "col1",
      },

      {
        Header: "Column 2",
        accessor: "col2",
      },
    ]}
    data={[
      {
        col1: "Hello",

        col2: "World",
      },

      {
        col1: <Text>Hello World</Text>,

        col2: "rocks",
      },

      {
        col1: "whatever",

        col2: "you want",
      },
    ]}
  />
)
