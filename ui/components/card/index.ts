import React from "react"
import { CardContent, } from "./content"
import { CardFooter, CardFooterProps, } from "./footer"
import { CardFooterActions, } from "./footer/actions"
import { CardFooterStatus, } from "./footer/status"
import { CardHeader, CardHeaderProps, } from "./header"
import { CardHeaderTitle, } from "./header/title"
import { Root, RootProps, } from "./root"

type NestedHeader<P = CardHeaderProps,> = React.FC<P> & {
  Title: typeof CardHeaderTitle
}

type NestedFooter<P = CardFooterProps,> = React.FC<P> & {
  Status: typeof CardFooterStatus
  Actions: typeof CardFooterActions
}

type NestedCard<P = RootProps,> = React.FC<P> & {
  Header: NestedHeader
  Content: typeof CardContent
  Footer: NestedFooter
}

const Header = CardHeader as NestedHeader
Header.Title = CardHeaderTitle

const Footer = CardFooter as NestedFooter
Footer.Status = CardFooterStatus
Footer.Actions = CardFooterActions

const TMP = Root as NestedCard
TMP.Header = Header
TMP.Content = CardContent
TMP.Footer = Footer
TMP.Footer.Status = CardFooterStatus

export const Card = TMP
