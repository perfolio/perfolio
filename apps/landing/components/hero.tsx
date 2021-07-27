import React from "react"
import { Button } from "@perfolio/ui/components"
import { useI18n } from "@perfolio/feature/i18n"

export const HeroSection: React.FC = (): JSX.Element => {
  const { t } = useI18n()
  return (
    <div className="flex flex-col items-center w-full space-y-4 md:space-y-8 xl:space-y-12 ">
      <h1 className="py-3 -my-3 text-3xl font-extrabold text-transparent sm:text-center bg-clip-text bg-gradient-to-tr from-gray-900 to-primary-dark text-shadow-md sm:text-5xl lg:text-6xl">
        {t("headline")}
      </h1>
      <p className="text-gray-600 sm:text-lg sm:mx-auto md:text-xl lg:mx-0 sm:text-center">
        Keeping track of all your assets and their performance is hard. Perfolio brings all
        information to one place and gives you access to the latest analytics methods in science.
      </p>

      <div className="grid w-full gap-4 sm:w-1/2 md:w-1/3 lg:w-1/4 sm:grid-cols-2">
        <Button kind="primary" size="auto" href="https://app.perfol.io/auth/signin">
          Sign up
        </Button>
        <Button size="auto" kind="secondary" href="mailto:info@perfol.io">
          Contact
        </Button>
      </div>
    </div>
  )
}
