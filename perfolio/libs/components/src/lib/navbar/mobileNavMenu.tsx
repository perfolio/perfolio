import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import cn from 'classnames';
import React from 'react';
import { MenuProps } from './types';

export const MobileNavMenu: React.FC<MenuProps> = ({
  label,
  icon,
  menu,
}): JSX.Element => {
  return (
    <div className="w-full">
      <div className="w-full">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full p-4 focus:outline-none ">
                <a className="flex items-center space-x-4 text-gray-900">
                  <div className="w-6 h-6">{icon}</div>
                  <p className="cursor-pointer">{label}</p>
                </a>
                <ChevronUpIcon
                  className={cn('w-5 h-5 transform duration-100', {
                    '-rotate-180': open,
                  })}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-500 ease-out"
                enterFrom="transform opacity-0"
                enterTo="transform opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="transform opacity-100"
                leaveTo="transform  opacity-0"
              >
                <Disclosure.Panel className="p-4 space-y-4 text-sm text-gray-500 rounded bg-gray-50">
                  {menu.map((item) => (
                    <Link href={item.href} key={item.name}>
                      <a className="flex items-center ml-10 focus:outline-none ">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
