import React from "react"
import Image from "next/image"
import { NextPage, GetStaticProps } from "next"
import {
  Navbar,
  Member,
  Feature,
  Section,
  SectionTitle,
  HeroSection,
  Footer,
  Price,
} from "@perfolio/ui/landing"

import { Text } from "@perfolio/ui/components"
import {
  ChartSquareBarIcon,
  CreditCardIcon,
  DatabaseIcon,
  FlagIcon,
  HomeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline"
import { getTranslations, useI18n } from "@perfolio/pkg/i18n"

export interface IndexPageProps {
  members: { name: string; title: string; image: string }[]
  translations: Record<string, string>
}

const IndexPage: NextPage<IndexPageProps> = ({ members, translations }) => {
  const { t } = useI18n(translations)
  return (
    <div>
      <div className="pt-16 -mt-16 bg-gray-50 ">
        <div className="fixed inset-x-0 top-0 z-20 bg-gray-50">
          <Navbar />
        </div>
        <Section bg="bg-gray-50 " className="relative py-20" id="index">
          <div className="flex flex-col items-center px-4 space-y-8 lg:space-y-16">
            <HeroSection />

            <div className="hidden max-w-screen-xl border rounded border-gray-50 shadow-ambient lg:block">
              <Image
                className="border border-white rounded"
                src="/img/analytics_preview.png"
                alt="Analytics Preview"
                width="1908"
                height="952"
              />
            </div>
          </div>
        </Section>
        <Section id="features" className="relative flex flex-col justify-center">
          <SectionTitle tag={t("whyPerfolio")} title={t("headerWhy")} />

          <div className="grid max-w-screen-lg mx-auto space-y-16 lg:grid-cols-2 lg:space-y-0 lg:divide-x lg:divide-gray-300">
            <div className="flex flex-col items-center justify-center space-y-16 lg:pr-8">
              {[
                {
                  icon: <FlagIcon />,
                  title: t("independent"),
                  description: t("independentDescription"),
                },
                {
                  icon: <ChartSquareBarIcon />,
                  title: t("complexMadeEasy"),
                  description: t("complexMadeEasyDescription"),
                },
                {
                  icon: <HomeIcon />,
                  title: t("allInOnePlace"),
                  description: t("allInOnePlaceDescription"),
                },
              ].map((f) => {
                return (
                  <Feature
                    key={f.title}
                    icon={f.icon}
                    title={f.title}
                    description={f.description}
                  ></Feature>
                )
              })}
            </div>

            <div className="flex flex-col items-center justify-center space-y-16 lg:pl-8">
              {[
                {
                  icon: <DatabaseIcon />,
                  title: t("highestDataQuality"),
                  description: t("highestDataQualityDescription"),
                },
                {
                  icon: <ShieldCheckIcon />,
                  title: t("privacyAndSecurity"),
                  description: t("privacyAndSecurityDescription"),
                },
                {
                  icon: <CreditCardIcon />,
                  title: t("fairPricing"),
                  description: t("fairPricingDescription"),
                },
              ].map((f) => (
                <Feature
                  key={f.title}
                  icon={f.icon}
                  title={f.title}
                  description={f.description}
                ></Feature>
              ))}
            </div>
          </div>
        </Section>
        <Section id="pricing" className="flex flex-col justify-center">
          <SectionTitle tag={t("headerPricing")} title={t("subheaderPricing")} />

          <div className="flex flex-col items-center justify-center space-y-8 md:flex-row md:space-y-0 md:space-x-8">
            <Price
              title="Growth"
              price={3.99}
              interval="month"
              features={[
                t("basicPlanFeatureData"),
                t("basicPlanFeaturePerformance"),
                t("basicPlanFeatureChart"),
              ]}
              href="https://app.perfol.io/auth/sign-in"
              submitText={t("getStartedButton")}
              highlighted
            />
            <Price
              title="Pro"
              price={8.99}
              interval="month"
              features={[
                t("basicPlanFeatureData"),
                t("basicPlanFeaturePerformance"),
                t("basicPlanFeatureChart"),
              ]}
              href="https://app.perfol.io/auth/sign-in"
              submitText={t("takeOffButton")}
            />
          </div>
        </Section>
        <Section className="flex flex-col justify-center" id="team">
          <SectionTitle tag={t("teamHeader")} title={t("teamSubheader")} />
          <Text align="text-center">{t("perfolioDescription")}</Text>
          <div className="grid w-full gap-10 row-gap-8 mx-auto mt-16 sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => {
              return <Member key={m.name} name={m.name} title={m.title} image={m.image} />
            })}
          </div>
        </Section>
      </div>
      <Footer />
    </div>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps<IndexPageProps> = async ({ locale }) => {
  const translations = getTranslations(locale, ["landing"])
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
      ],
      translations,
    },
  }
}
