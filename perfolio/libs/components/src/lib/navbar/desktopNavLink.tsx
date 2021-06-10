import React from 'react';
import Link from 'next/link';
import { NavLink } from './navLink';
import { NavLinkProps } from './types';
export const DesktopNavLink: React.FC<NavLinkProps> = ({
  href,
  label,
  icon,
}): JSX.Element => {
  return (
    <Link href={href}>
      <a className="focus:outline-none">
        <NavLink prefix={icon} label={label} />
      </a>
    </Link>
  );
};
