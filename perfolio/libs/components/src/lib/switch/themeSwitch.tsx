import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import { useTheme } from 'next-themes';

export const ThemeSwitch: React.FC = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState(false);
  const { setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => {
        /**
         * If currently in darkmode, set to light.
         */
        setTheme(darkMode ? 'light' : 'dark');
        setDarkMode(!darkMode);
      }}
      className="w-6 h-6 focus:outline-none"
    >
      <span aria-hidden="true" className="inline-block">
        {darkMode ? (
          <MoonIcon className="text-info-300 hover:text-info-100" />
        ) : (
          <SunIcon className="text-secondary-300 hover:text-secondary-100" />
        )}
      </span>
    </button>
  );
};
