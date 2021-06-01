import React, { useState } from "react"
import { BlitzPage, Routes, Image, useMutation } from "blitz"
import { Navbar } from "../components/navbar"
import {
  Member,
  Feature,
  Section,
  SectionTitle,
  HeroSection,
  Box,
  LabeledTextField,
  Form,
  FORM_ERROR,
  Button,
} from "app/core/components"
import * as z from "zod"
import { CheckIcon, MailIcon } from "@heroicons/react/outline"
import createSubscription from "app/newsletters/mutations/createSubscription"
import { Footer } from "../components/footer"
import { Price } from "../components/price"
const members: { name: string; title: string; image: string }[] = [
  {
    name: "Nicolas Webersinke",
    title: "Product",
    image: "/img/nico.jpeg",
  },
  {
    name: "Andreas Thomas",
    title: "Tech",
    image: "/img/andreas.jpeg",
  },
  {
    name: "Mads Jordt",
    title: "Sales",
    image: "/img/mads.jpeg",
  },
  {
    name: "Kevin Kohler",
    title: "Marketing",
    image: "/img/kevin.jpeg",
  },
  {
    name: "Lauren Mackintosh",
    title: "Business Development",
    image: "/img/lauren.jpeg",
  },
  {
    name: "Luis Meister",
    title: "Product",
    image: "/img/luis.png",
  },
  {
    name: "Lukas Meister",
    title: "Business Development",
    image: "/img/lukas.png",
  },
]

const features = () => {
  return [
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
          />
        </svg>
      ),
      title: "Independent",
      description:
        "We are not part of any bank or insurance company. We give you an unbiased view of your portfolio, not selling any investment products.",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Complex made easy",
      description:
        "Everybody should have access to the latest analytics methods in science. Making these methods as simple and understandable as possible is part of our core business.",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      title: "All in one place",
      description:
        "Tired of visiting several websites and apps to get an overview of your assets? Perfolio is the new home for your data",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
      title: "Highest data quality",
      description:
        "We cleanse and analyze data according to the highest standards. With our Premium plan you get access to even better data quality.",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Privacy and Security",
      description:
        "We do not share your data with anyone else and store them only on servers within the EU. Privacy and security are our highest priority.",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      title: "Fair pricing",
      description:
        "Start for free! If you want more, get the plan that suits you best. No hidden fees.",
    },
  ]
}
const IndexPage: BlitzPage = () => {
  const [subscribeMutation, { isSuccess }] = useMutation(createSubscription)

  return (
    <div>
      <div className="pt-16 -mt-16 bg-gray-50 ">
        <div className="fixed inset-x-0 top-0 z-20 bg-gray-50">
          <Navbar
            links={[
              {
                label: "Product",
                href: "/#index",
              },
              {
                label: "Features",
                href: "/#features",
              },
              {
                label: "Pricing",
                href: "/#pricing",
              },
              {
                label: "Team",
                href: "/#team",
              },
            ]}
          ></Navbar>
        </div>
        <Section bg="bg-gray-50 " className="relative py-20" id="index">
          <div className="flex flex-col items-center px-4 space-y-8 lg:space-y-16">
            <HeroSection
              headline="Insights. For Everyone."
              paragraph={
                <p className="flex flex-col xl:flex-row">
                  Keeping track of all your assets and their performance is
                  hard. Perfolio brings all information to one place and gives
                  you access to the latest analytics methods in science.
                </p>
              }
              primaryButton={
                <Button
                  kind="primary"
                  size="large"
                  label="Sign up"
                  href="/auth/signup"
                />
              }
              secondaryButton={
                <Button
                  size="large"
                  kind="secondary"
                  label="Contact"
                  href="mailto:info@perfol.io"
                />
              }
            ></HeroSection>

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
        <Section
          bg="bg-white"
          id="features"
          className="flex flex-col justify-cente "
        >
          <SectionTitle
            tag="Why Perfolio?"
            title="Make decisions based on data"
            onRight
          />

          <ul className="flex flex-col flex-wrap mx-auto my-24 md:flex-row">
            {features().map((f, index) => {
              return (
                <li key={index} className="p-3 md:w-1/2 xl:w-1/3">
                  <Feature
                    icon={f.icon}
                    title={f.title}
                    description={f.description}
                  ></Feature>
                </li>
              )
            })}
          </ul>
        </Section>
        <Section
          bg="bg-gray-50"
          id="pricing"
          className="flex flex-col justify-center"
        >
          <SectionTitle
            tag="Fair pricing"
            title="Start for free, cancel anytime!"
          />

          <div className="flex flex-col justify-center w-full mt-4 space-y-8 leading-7 text-gray-900 border-0 border-gray-200 md:space-x-16 md:space-y-0 md:flex-row sm:mt-6 md:mt-8 ">
            <Box>
              <Price
                title="Try it for free"
                description="Just do it"
                price={0}
                bullets={[
                  "Manual data import",
                  "Performance dashboard and key figures",
                  "Chart diagram of sectors",
                ]}
                href="/login"
              />
            </Box>
            <Box>
              <Price
                title="Premium"
                description="Cool pricing"
                price={7.98}
                interval="month"
                bullets={[
                  "Manual data import",
                  "Performance dashboard and key figures",
                  "Chart diagram of sectors",
                ]}
                href="/login"
                highlighted
              />
            </Box>
          </div>
        </Section>
        <Section
          bg="bg-white"
          className="flex flex-col justify-center"
          id="team"
        >
          <SectionTitle tag="Our Team" title="Who is behind this?" onRight />

          <div className="flex flex-col items-center mt-10 md:flex-row">
            <div className="text-center md:w-1/3 md:pr-8 md:py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-t from-gray-900 to-primary-800 md:h-32 md:w-32">
                <svg
                  className="w-full p-3 text-white stroke-current md:p-4"
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
              <div className="flex flex-col items-center justify-center mt-4 space-y-2 text-center">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  Perfolio
                </h2>
                <p className="text-base leading-6 text-left text-gray-600 md:text md:text-center">
                  At Perfolio, we believe that investment decisions should
                  always be based on as much well-founded information as
                  possible. It is our mission to provide our users the most
                  relevant and accurate financial information available.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-300 md:w-2/3 md:pl-8 md:py-8 md:border-l md:border-t-0 md:mt-0">
              <div className="flex flex-col items-center justify-center sm:flex-row sm:flex-wrap">
                {members
                  .sort(() => 0.5 - Math.random())
                  .map((m) => {
                    return (
                      <Member
                        key={m.name}
                        className="w-2/3 p-4 sm:w-1/2 lg:w-1/4"
                        name={m.name}
                        title={m.title}
                        image={m.image}
                      />
                    )
                  })}
              </div>
              <p className="mt-8 text-center text-gray-600">
                We are a motivated team of enthusiastic techies who are
                passionate about capital market topics. Bringing together
                different backgrounds and skills, we want to revolutionize the
                way investors track their assets and measure the success of
                their investment strategy. We are always happy to chat - drop us
                a message!
              </p>
            </div>
          </div>
        </Section>
        <Section bg="bg-gray-50" id="subscribe">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-3 font-semibold tracking-wide text-purple-800 uppercase sm:text-lg sm:leading-snug">
                Get in touch
              </h2>
              <p className="mb-8 text-3xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Curious for more?
              </p>
            </div>
            <div className="">
              {isSuccess ? (
                <div className="flex items-center justify-center">
                  Thank you, we'll be in touch.
                </div>
              ) : (
                <Form
                  submitText="Subscribe"
                  schema={z.object({
                    email: z.string().email(),
                  })}
                  initialValues={{ email: "" }}
                  onSubmit={async (values) => {
                    try {
                      await subscribeMutation(values)
                    } catch (error) {
                      return {
                        [FORM_ERROR]:
                          "Sorry, we had an unexpected error. Please try again.",
                      }
                    }
                  }}
                >
                  <LabeledTextField
                    name="email"
                    label="Email"
                    type="email"
                    iconLeft={<MailIcon />}
                  />
                </Form>
              )}
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </div>
  )
}

export default IndexPage
