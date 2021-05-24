import React from "react"
import { Header, HeaderProps } from "./header"

export default {
  component: Header,
  title: "components/table/Header",
}

export const primary = (): JSX.Element => {
  /* eslint-disable-next-line */
  const props: HeaderProps = {
    labels: ["Name", "Surname", "Email"],
  }

  return (
    <table>
      <Header labels={props.labels} />
    </table>
  )
}
