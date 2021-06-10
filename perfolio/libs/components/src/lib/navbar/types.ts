export interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  menu?: {
    icon: JSX.Element;
    name: string;
    href: string;
    description: string;
  }[];
}

export interface NavbarProps {
  items: NavigationItem[];
}

export interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}
export interface MenuProps {
  label: string;
  icon: React.ReactNode;
  menu: {
    icon: JSX.Element;
    name: string;
    href: string;
    description: string;
  }[];
}
