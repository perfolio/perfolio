import React from "react"
import { Multiline, MultilineProps } from "./multiline"

export default {
  component: Multiline,
  title: "components/table/cell/Multiline",
}

export const primary = (): JSX.Element => {
  const props: MultilineProps = {
    title: "Title",
    content: "Content",
  }
  return <Multiline title={props.title} content={props.content} />
}
