import React from "react"
import { DrawerContent } from "./content"
import { Drawer as Root, DrawerProps as RootProps } from "./drawer"
import { DrawerFooter } from "./footer"

type NestedDrawer<P = RootProps> = React.FC<P> & {
  Footer: typeof DrawerFooter
  Content: typeof DrawerContent
}

const TMP = Root as NestedDrawer
TMP.Footer = DrawerFooter
TMP.Content = DrawerContent

export const Drawer = TMP
