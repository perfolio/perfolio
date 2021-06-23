import { Root, RootProps } from "./root"
import { CardTitle } from "./title"
import { CardContent } from "./content"
import { CardFooter, CardFooterProps } from "./footer"
import { CardFooterStatus } from "./footer/status"
import { CardFooterActions } from "./footer/actions"
import React from "react"

type NestedFooter<P = CardFooterProps> = React.FC<P> & {
  Status: typeof CardFooterStatus
  Actions: typeof CardFooterActions
}

type NestedCard<P = RootProps> = React.FC<P> & {
  Title: typeof CardTitle
  Content: typeof CardContent
  Footer: NestedFooter
}

const Footer = CardFooter as NestedFooter
Footer.Status = CardFooterStatus
Footer.Actions = CardFooterActions

export const TMP = Root as NestedCard
TMP.Title = CardTitle
TMP.Content = CardContent
TMP.Footer = Footer
TMP.Footer.Status = CardFooterStatus

export const Card = TMP
