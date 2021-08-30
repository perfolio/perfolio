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
} from "../components"
import {
  ChartSquareBarIcon,
  CreditCardIcon,
  DatabaseIcon,
  FlagIcon,
  HomeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline"
import { getTranslations, useI18n } from "@perfolio/feature/i18n"
import { Text } from "@perfolio/ui/components"
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
                src="/img/analytics_preview.png"
                alt="Analytics Preview"
                width="1908"
                height="952"
              />
            </div>
          </div>
        </Section>
        <Section id="features" className="relative flex flex-col justify-center">
          <SectionTitle tag="Why Perfolio?" title="Make decisions based on data" />

          <div className="grid max-w-screen-lg mx-auto space-y-6 lg:grid-cols-2 lg:space-y-0 lg:divide-x lg:divide-gray-300">
            <div className="flex flex-col items-center justify-center pr-8 space-y-16">
              {[
                {
                  icon: <FlagIcon />,
                  title: t("independent"),
                  description:
                    "We are not part of any bank or insurance company. We give you an unbiased view of your portfolio, not selling any investment products.",
                },
                {
                  icon: <ChartSquareBarIcon />,
                  title: "Complex made easy",
                  description:
                    "Everybody should have access to the latest analytics methods in science. Making these methods as simple and understandable as possible is part of our core business.",
                },
                {
                  icon: <HomeIcon />,
                  title: "All in one place",
                  description:
                    "Tired of visiting several websites and apps to get an overview of your assets? Perfolio is the new home for your data",
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

            <div className="flex flex-col items-center justify-center pl-8 space-y-16">
              {[
                {
                  icon: <DatabaseIcon />,
                  title: "Highest data quality",
                  description:
                    "We cleanse and analyze data according to the highest standards. With our Premium plan you get access to even better data quality.",
                },
                {
                  icon: <ShieldCheckIcon />,
                  title: "Privacy and Security",
                  description:
                    "We do not share your data with anyone else and store them only on servers within the EU. Privacy and security are our highest priority.",
                },
                {
                  icon: <CreditCardIcon />,
                  title: "Fair pricing",
                  description:
                    "Start for free! If you want more, get the plan that suits you best. No hidden fees.",
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
          <SectionTitle tag="Fair pricing" title="Start for free, cancel anytime!" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Price
              title="Try for free"
              price={0}
              features={[
                "Manual data import",
                "Performance dashboard and key figures",
                "Chart diagram of sectors",
              ]}
              href="/api/auth/login"
              submitText="Try for free"
            />
            <Price
              title="Basic"
              price={3.99}
              interval="month"
              features={[
                "Manual data import",
                "Performance dashboard and key figures",
                "Chart diagram of sectors",
              ]}
              href="/api/auth/login"
              submitText="Get started"
              highlighted
            />
            <Price
              title="Pro"
              price={8.99}
              interval="month"
              features={[
                "Manual data import",
                "Performance dashboard and key figures",
                "Chart diagram of sectors",
              ]}
              href="/api/auth/login"
              submitText="Take off"
            />
          </div>
        </Section>
        <Section className="flex flex-col justify-center" id="team">
          <SectionTitle tag="Our Team" title="Who is behind this?" />
          <Text align="text-center">
            At Perfolio, we believe that investment decisions should always be based on as much
            well-founded information as possible. It is our mission to provide our users the most
            relevant and accurate financial information available.
          </Text>
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

export const getStaticProps: GetStaticProps<IndexPageProps> = async ({ locale }) => {
  const translations = getTranslations(locale, ["common", "landing"])
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
          name: "Lauren Mackintosh",
          title: "Marketing & Sales",
          image: "/img/lauren.jpeg",
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

export default IndexPage
