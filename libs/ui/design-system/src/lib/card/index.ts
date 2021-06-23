import { Root, RootProps } from "./root"
import { CardTitle } from "./title"
import { CardContent } from "./content"
import { CardFooter, CardFooterProps } from "./footer"
import { CardFooterStatus } from "./footer/status"
import { CardFooterActions } from "./footer/actions"
import React from "react"

type FooterComponent<P = CardFooterProps> = React.FC<P> & {
  Status: typeof CardFooterStatus
  Actions: typeof CardFooterActions
}

type CardComponent<P = RootProps> = React.FC<P> & {
  Title: typeof CardTitle
  Content: typeof CardContent
  Footer: FooterComponent
}

const Footer = CardFooter as FooterComponent
Footer.Status = CardFooterStatus
Footer.Actions = CardFooterActions

export const TMP = Root as CardComponent
TMP.Title = CardTitle
TMP.Content = CardContent
TMP.Footer = Footer
TMP.Footer.Status = CardFooterStatus

export const Card = TMP
