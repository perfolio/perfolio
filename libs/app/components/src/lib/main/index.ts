import { Root, RootProps } from "./root"
import { MainHeader, MainHeaderProps } from "./header"
import { MainTitle } from "./title"
import { MainContent } from "./content"
import React from "react"
import { MainDivider } from "./divider"

type NestedHeader<P = MainHeaderProps> = React.FC<P> & {
  Title: typeof MainTitle
}

type NestedMain<P = RootProps> = React.FC<P> & {
  Header: NestedHeader
  Content: typeof MainContent
  Divider: typeof MainDivider
}

const Header = MainHeader as NestedHeader
Header.Title = MainTitle

export const TMP = Root as NestedMain
TMP.Header = Header
TMP.Content = MainContent
TMP.Divider = MainDivider

export const Main = TMP
