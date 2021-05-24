import React from "react"
import { Simple } from "./simple"

export default {
  component: Simple,
  title: "components/table/cell/Simple",
}

export const primary = (): JSX.Element => {
  return <Simple label="Label" />
}
