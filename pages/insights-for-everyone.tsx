import { Button } from "@perfolio/ui/components"
import { Footer, Navbar } from "@perfolio/ui/landing"
import { NextPage } from "next"
import Image from "next/image"
import React from "react"
import { useI18n } from "next-localization"

export interface PrivacyPageProps {}

export const Privacy: NextPage<PrivacyPageProps> = () => {
  const { t } = useI18n()

  return (
    <div>
      <div className="pt-16 -mt-16">
        <div className="fixed inset-x-0 top-0 z-20 bg-white">
          <Navbar />
        </div>
        <div className="relative py-16 mt-20 overflow-hidden bg-white">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="mx-auto text-lg max-w-prose">
              <h1 className="pt-20" id="simple-metrics">
                <span className="block text-base font-semibold tracking-wide text-center text-transparent uppercase bg-clip-text bg-gradient-to-tr from-primary to-secondary">
                  Insights. For Everyone.
                </span>
                <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
                  {t("whyperfolio.headline")}
                </span>
              </h1>
            </div>
            <div className="mx-auto mt-6 prose prose-lg text-gray-500 prose-primary">
              <p>{t("whyperfolio.subtitle")}</p>
              <p>
                <strong>{t("whyperfolio.initialquestionstatement")} </strong>{" "}
                {t("whyperfolio.initialquestionanswer")}
              </p>
              <p>{t("whyperfolio.IntroParagraphOne")}</p>
              <p>{t("whyperfolio.IntroParagraphTwo")}</p>
              <p>{t("whyperfolio.IntroParagraphThree")}</p>
              <p>{t("whyperfolio.IntroParagraphFour")}</p>
              <p>{t("whyperfolio.IntroParagraphFive")}</p>
              <h2 className="pt-20" id="intuitive-powerful">
                {t("whyperfolio.titleOne")}
              </h2>
              <p>{t("whyperfolio.FirstParagraphOne")}</p>

              <p>{t("whyperfolio.FirstParagraphTwo")}</p>
              <ul role="list">
                <li>{t("whyperfolio.ListPointZero")}</li>
                <li> {t("whyperfolio.ListPointOne")}</li>
                <li> {t("whyperfolio.ListPointTwo")}</li>
                <li> {t("whyperfolio.ListPointThree")}</li>
              </ul>

              <p>{t("whyperfolio.FirstParagraphThree")}</p>

              <h2 className="pt-20" id="sustainability-insights">
                {t("whyperfolio.titleTwo")}
              </h2>
              <p>{t("whyperfolio.SecondParagraphOne")}</p>
              <p>{t("whyperfolio.SecondParagraphTwo")}</p>
              <p>{t("whyperfolio.SecondParagraphThree")}</p>
              <div className="flex justify-center">
                <figure>
                  <Image
                    className="w-full rounded-lg"
                    src="/img/esg-chart.png"
                    alt="ESG rating chart"
                    width={386}
                    height={512}
                  />
                  <figcaption>
                    <a href="https://www.handelsblatt.com/finanzen/anlagestrategie/trends/nachhaltig-investieren-chaos-bei-gruenen-ratings-das-steckt-dahinter/27378324.html?ticket=ST-9140443-uvTWFpJAXp6EddJXSzwB-cas01.example.org">
                      Source
                    </a>
                  </figcaption>
                </figure>
              </div>
              <h2 className="pt-20" id="why-metrics">
                {t("whyperfolio.titleThree")}
              </h2>
              <p>{t("whyperfolio.ThirdParagraphOne")}</p>
              <p>{t("whyperfolio.ThirdParagraphTwo")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-tr from-primary to-secondary">
        <div className="max-w-2xl px-4 py-16 mx-auto text-center sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">{t("whyperfolio.CalltoActiontitle")}</span>
            <span className="block text-gray-800">{t("whyperfolio.CalltoActionsubtitle")}</span>
          </h2>
          <div className="inline-flex mt-8">
            <Button size="lg" type="primary">
              {t("whyperfolio.CalltoActionbutton")}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Privacy
