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
import { Button } from "@perfolio/ui/components"
import {
  ChartSquareBarIcon,
  CreditCardIcon,
  DatabaseIcon,
  FlagIcon,
  HomeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline"
import { getTranslations, useI18n } from "@perfolio/feature/i18n"

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

            <div className="hidden max-w-screen-xl border rounded shadow-2xl lg:block">
              <Image
                src="/img/analytics_preview.png"
                alt="Analytics Preview"
                width="1908"
                height="952"
              />
            </div>
          </div>
        </Section>
        <Section id="features" className="flex flex-col justify-center ">
          <SectionTitle tag="Why Perfolio?" title="Make decisions based on data" />

          <ul className="flex flex-col flex-wrap mx-auto my-24 md:flex-row">
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
            ].map((f, index) => {
              return (
                <li key={index} className="p-3 md:w-1/2 xl:w-1/3">
                  <Feature icon={f.icon} title={f.title} description={f.description}></Feature>
                </li>
              )
            })}
          </ul>
        </Section>
        <Section id="pricing" className="flex flex-col justify-center">
          <SectionTitle tag="Fair pricing" title="Start for free, cancel anytime!" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Price
              title="Try for free"
              price={0}
              bullets={[
                "Manual data import",
                "Performance dashboard and key figures",
                "Chart diagram of sectors",
              ]}
              href="https://app.perfol.io/sign-up"
              submitText="Try for free"
            />
            <Price
              title="Basic"
              price={3.99}
              interval="month"
              bullets={[
                "Manual data import",
                "Performance dashboard and key figures",
                "Chart diagram of sectors",
              ]}
              href="https://app.perfol.io/sign-up"
              submitText="Get started"
            />
            <Price
              title="Pro"
              price={8.99}
              interval="month"
              bullets={[
                "Manual data import",
                "Performance dashboard and key figures",
                "Chart diagram of sectors",
              ]}
              href="https://app.perfol.io/sign-up"
              highlighted
              submitText="Take off"
            />
          </div>
        </Section>
        <Section className="flex flex-col justify-center" id="team">
          <SectionTitle tag="Our Team" title="Who is behind this?" />

          <div className="flex flex-col items-center mt-10 md:flex-row">
            <div className="text-center md:w-1/3 md:pr-8 md:py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-full md:h-40 md:w-40">
                <svg
                  className="w-full p-3 text-white fill-current md:p-4"
                  viewBox="0 0 354 283"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M247.35 70.671L176.678 0 0 176.678l35.336 35.336L176.678 70.671l35.336 35.336 35.336-35.336zM106.007 212.014l70.671 70.671 176.679-176.678-35.336-35.336-141.343 141.343-35.335-35.336-35.336 35.336z"
                    fill="fill-current"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-center justify-center mt-4 space-y-2 text-center">
                <h2 className="text-lg font-medium leading-6 text-black">Perfolio</h2>
                <p className="text-base leading-6 text-left text-gray-600 md:text md:text-center">
                  At Perfolio, we believe that investment decisions should always be based on as
                  much well-founded information as possible. It is our mission to provide our users
                  the most relevant and accurate financial information available.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-300 md:w-2/3 md:pl-8 md:py-8 md:border-l md:border-t-0 md:mt-0">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {members.map((m) => {
                  return <Member key={m.name} name={m.name} title={m.title} image={m.image} />
                })}
              </div>
              <p className="mt-8 text-center text-gray-600">
                We are a motivated team of enthusiastic techies who are passionate about capital
                market topics. Bringing together different backgrounds and skills, we want to
                revolutionize the way investors track their assets and measure the success of their
                investment strategy. We are always happy to chat - drop us a message!
              </p>
            </div>
          </div>
        </Section>
        <Section id="subscribe">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div>
              <h2 className="mb-3 font-semibold tracking-wide text-gray-900 uppercase sm:text-lg sm:leading-snug">
                Get in touch
              </h2>
              <p className="mb-8 text-3xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Curious for more?
              </p>
            </div>
            <Button kind="cta" href="https://app.perfol.io/subscribe">
              Subscribe
            </Button>
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
