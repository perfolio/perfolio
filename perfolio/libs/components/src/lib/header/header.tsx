import React from 'react';
import { DesktopNavbar, MobileNavbar } from '../navbar';
import {
  ChartSquareBarIcon,
  PlusIcon,
  BookOpenIcon,
} from '@heroicons/react/outline';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {}

const menu = {
  items: [
    {
      label: 'Dashboard',
      icon: <ChartSquareBarIcon />,
      href: '/app',
    },
    {
      label: 'Transactions',
      icon: <BookOpenIcon />,
      menu: [
        {
          name: 'My Transactions',
          href: '/app/transactions',
          icon: <BookOpenIcon />,
          description: 'See your existing transactions',
        },
        {
          name: 'Add manually',
          href: '/app/transactions/new',
          icon: <PlusIcon />,
          description: 'Add a transaction by entering data yourself',
        },
      ],
    },
  ],
};

export const Header: React.FC<HeaderProps> = (): JSX.Element => {
  return (
    <div className="h-full pt-6 bg-gray-900 md:pt-8 xl:pt-12">
      <div className="container px-4 mx-auto xl:px-0">
        <div className="hidden xl:flex">
          <DesktopNavbar items={menu.items} />
        </div>
        <div className="xl:hidden">
          <MobileNavbar items={menu.items} />
        </div>
      </div>
    </div>
  );
};
