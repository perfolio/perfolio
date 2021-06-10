import { Logo } from "@perfolio/components";
import React from 'react';

export interface AuthPageTemplateProps {
  h1: React.ReactNode;
  h2?: React.ReactNode;
}

export const AuthPageTemplate: React.FC<AuthPageTemplateProps> = ({
  h1,
  h2,
  children,
}): JSX.Element => {
  return (
    <section className="relative w-screen h-screen bg-white ">
      <div className="container w-full h-full mx-auto">
        <div className="flex flex-col items-center justify-center h-full md:flex-row">
          <div className="relative items-center justify-center hidden w-2/3 h-full md:flex md:flex-col bg-gradient-to-r from-white to-gray-100">
            <div className="absolute inset-y-0 items-center justify-center hidden md:flex">
              <svg
                className="z-0 w-full h-full p-8 text-gray-100 stroke-current"
                viewBox="0 0 194 148"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 106.208L97.3883 17.8199L134.158 54.5894M185.07 41.8615L96.6814 130.25L59.9118 93.4803"
                  strokeWidth="25"
                />
              </svg>
            </div>
            <div className="z-50 flex flex-col items-center justify-center px-8 space-y-4 tracking-tight text-center md:text-left md:items-start md:justify-start md:max-w-3xl">
              <h1 className="text-4xl font-bold text-gray-900 xl:text-7xl">
                {h1}
              </h1>
              <h2 className="text-lg font-normal text-gray-500 ">{h2}</h2>
            </div>
          </div>
          <div className="flex items-center justify-center px-6 mx-auto">
            {children}
          </div>
          <div className="absolute flex items-center justify-between w-full md:hidden top-12">
            <span className="w-4/5 border-b border-primary-600"></span>

            <span className="flex justify-center w-full text-gray-900 md:hidden ">
              <Logo withName />
            </span>

            <span className="w-4/5 border-b border-primary-600"></span>
          </div>
        </div>
      </div>

      {/* <div className="relative flex flex-col h-screen mx-auto ">
        <div className="absolute inset-0 items-center justify-center hidden md:flex">
        <svg
        className="z-0 w-2/3 stroke-current text-gray-50 h-2/3"
        viewBox="0 0 194 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
              d="M9 106.208L97.3883 17.8199L134.158 54.5894M185.07 41.8615L96.6814 130.25L59.9118 93.4803"
              strokeWidth="25"
            />
          </svg>
        </div>
        <div className="z-50 flex flex-col items-center justify-center h-full space-y-10 md:space-y-0 md:flex-row">
          <div className="w-full bg-opacity-50 md:w-1/2 md:h-full md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-gray-100 md:bg-opacity-50">
            <div className="flex flex-col items-center justify-center w-full md:h-full">
              <div className="flex flex-col items-center justify-center px-8 space-y-4 tracking-tight text-center md:text-left md:items-start md:justify-start md:max-w-3xl">
                <h1 className="text-5xl font-bold text-primary-900 xl:text-6xl text-shadow-xl">
                  {h1}
                </h1>
                <h2 className="text-lg font-normal text-gray-500 ">{h2}</h2>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-screen space-y-16 md:w-1/2 ">
            {children}
          </div>
        </div>
        <div className="flex items-center justify-between mb-16 -mt-16 md:hidden ">
          <span className="w-4/5 border-b border-primary-600 md:w-1/5"></span>

          <span className="flex justify-center w-full md:hidden">
            <Logo />
          </span>

          <span className="w-4/5 border-b border-primary-600 md:w-1/5"></span>
        </div>
      </div> */}
    </section>
  );
};
