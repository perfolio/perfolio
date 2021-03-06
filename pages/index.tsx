import {
  Feature,
  Footer,
  HeroSection,
  Member,
  Navbar,
  Section,
  SectionTitle,
} from "@perfolio/ui/landing"

import { useI18n } from "next-localization"

import { GetStaticProps, NextPage } from "next"
import Image from "next/image"
import React from "react"

import {
  ChartSquareBarIcon,
  CreditCardIcon,
  DatabaseIcon,
  FlagIcon,
  HomeIcon,
  ShieldCheckIcon,
  CheckIcon,
} from "@heroicons/react/outline"
import { Text, Button } from "@perfolio/ui/components"
import { AnimateInViewport } from "@perfolio/ui/components/animateInViewport"
import { Transition } from "@headlessui/react"

export interface IndexPageProps {
  members: { name: string; title: string; image: string }[]
  features: string[]
}

const IndexPage: NextPage<IndexPageProps> = ({ members, features }) => {
  const { t } = useI18n()

  return (
    <div>
      <div className="pt-16 -mt-16 bg-gray-50 ">
        <div className="fixed inset-x-0 top-0 z-20 bg-gray-50">
          <Navbar />
        </div>
        <Section className="relative py-20" id="index">
          <div className="flex flex-col items-center px-4 space-y-8 lg:space-y-16">
            <HeroSection />
            <div className="hidden max-w-screen-xl border rounded border-gray-50 shadow-ambient lg:block">
              <Transition
                appear={true}
                show={true}
                enter="ease-in-out duration-1000 delay-1000"
                enterFrom="opacity-0 "
                enterTo="opacity-100"
              >
                <Image
                  className="border border-white rounded"
                  src="/img/analytics_preview.png"
                  alt="Analytics Preview"
                  width="1908"
                  height="952"
                />
              </Transition>
            </div>
          </div>
        </Section>
        <Section id="features" className="relative flex flex-col justify-center">
          <SectionTitle tag={t("landing.whyPerfolio")} title={t("landing.headerWhy")} />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <FlagIcon />,
                title: t("landing.independent"),
                description: t("landing.independentDescription"),
              },
              {
                icon: <ChartSquareBarIcon />,
                title: t("landing.complexMadeEasy"),
                description: t("landing.complexMadeEasyDescription"),
              },
              {
                icon: <HomeIcon />,
                title: t("landing.allInOnePlace"),
                description: t("landing.allInOnePlaceDescription"),
              },
              {
                icon: <DatabaseIcon />,
                title: t("landing.highestDataQuality"),
                description: t("landing.highestDataQualityDescription"),
              },
              {
                icon: <ShieldCheckIcon />,
                title: t("landing.privacyAndSecurity"),
                description: t("landing.privacyAndSecurityDescription"),
              },
              {
                icon: <CreditCardIcon />,
                title: t("landing.fairPricing"),
                description: t("landing.fairPricingDescription"),
              },
            ].map((f) => {
              return (
                <div key={f.title}>
                  <AnimateInViewport
                    enter="ease-in-out duration-1000"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                  >
                    <Feature icon={f.icon} title={f.title} description={f.description} />
                  </AnimateInViewport>
                </div>
              )
            })}
          </div>
        </Section>
        <Section id="pricing" className="flex flex-col justify-center">
          {/* <SectionTitle tag={t("headerPricing")} title={t("subheaderPricing")} /> */}

          <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
            <div className="pb-16 xl:flex xl:items-center xl:justify-between">
              <div>
                <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight">
                  <span className="text-gray-900">Become </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary">
                    beta tester
                  </span>
                  <span> and convince yourself</span>
                </h1>
                <p className="mt-5 text-xl text-gray-500">{t("landing.pricing.description")}</p>
              </div>
              <div className="inline-flex items-center justify-center mt-10 sm:w-auto xl:mt-0">
                <Button type="cta" size="block">
                  Get started today
                </Button>
              </div>
            </div>
            <AnimateInViewport
              enter="ease-in-out duration-1000"
              enterFrom="opacity-0 translate-y-16"
              enterTo="opacity-100 translate-y-0"
            >
              <div className="pt-16 border-t border-gray-200 xl:grid xl:grid-cols-3 xl:gap-x-8">
                <div>
                  <p className="text-3xl font-extrabold text-gray-900">
                    All-in-one asset management
                  </p>
                  <p className="mt-4 text-lg text-gray-500">
                    Investors tend to lose sight of their portfolio. Perfolio&apos;s portfolio
                    analytics solution puts you in control of your investments. See for yourself and
                    take advantage of all the benefits that the beta version offers. Through your
                    feedback we can continuously improve Perfolio to provide investors with the
                    right tools for their investments.
                  </p>
                </div>
                <ul
                  role="list"
                  className="gap-2 mt-4 sm:mt-8 md:mt-10 md:grid md:grid-cols-2 md:gap-8 xl:mt-0 xl:col-span-2 "
                >
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckIcon className="w-6 h-6 shrink-0 text-primary" aria-hidden="true" />
                      <span className="ml-3 text-base text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInViewport>
          </div>
        </Section>
        <Section className="flex flex-col justify-center" id="team">
          <SectionTitle tag={t("landing.teamHeader")} title={t("landing.teamSubheader")} />
          <Text align="text-center">{t("landing.perfolioDescription")}</Text>
          <AnimateInViewport
            enter="ease-in-out duration-1000"
            enterFrom="opacity-0 translate-y-16"
            enterTo="opacity-100 translate-y-0"
          >
            <div className="grid justify-center w-full gap-10 row-gap-8 mx-auto mt-16 sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3">
              {members.map((m) => {
                return <Member key={m.name} name={m.name} title={m.title} image={m.image} />
              })}
            </div>
          </AnimateInViewport>
        </Section>
      </div>
      <Footer />
    </div>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps<IndexPageProps> = async ({ locale }) => {
  const { default: translations } = await import(`@perfolio/public/locales/${locale}.json`)
  return {
    props: {
      members: [
        {
          name: "Nicolas Webersinke",
          title: "Product & Tech",
          image: "/img/nico.jpeg",
        },
        {
          name: "Andreas Thomas",
          title: "Tech",
          image: "/img/andreas.jpeg",
        },
        {
          name: "Mads Jordt",
          title: "Product",
          image: "/img/mads.jpeg",
        },
        {
          name: "Kevin Kohler",
          title: "Customer Relations",
          image: "/img/kevin.jpeg",
        },
        {
          name: "Luis Meister",
          title: "Business Development",
          image: "/img/luis.png",
        },
        {
          name: "Lukas Meister",
          title: "Business Development",
          image: "/img/lukas.png",
        },
        {
          name: "Tobias Hassel",
          title: "Tech",
          image: "/img/tobi.jpg",
        },
      ],

      features: [
        "Quick and easy manual data import",
        "Performance dashboard and key figures",
        "Assets from any broker",
        "Diversification analysis",
        "Breakdown of current assets",
        "Share table with in-depth company information",
      ],
      translations,
    },
  }
}
