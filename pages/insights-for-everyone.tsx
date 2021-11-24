import { Footer, Navbar } from "@perfolio/ui/landing"
import { NextPage } from "next"
import Image from "next/image"
import React from "react"

export interface PrivacyPageProps {}

export const Privacy: NextPage<PrivacyPageProps> = () => {
  return (
    <div>
      <div className="pt-16 -mt-16">
        <div className="fixed inset-x-0 top-0 z-20 bg-white">
          <Navbar />
        </div>
        <div className="relative py-16 mt-20 overflow-hidden bg-white">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="mx-auto text-lg max-w-prose">
              <h1>
                <span className="block text-base font-semibold tracking-wide text-center text-transparent uppercase bg-clip-text bg-gradient-to-tr from-primary to-secondary">
                  Insights. For Everyone.
                </span>
                <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
                  Simple portfolio analytics tool you can use to optimize your portfolio’s risk
                  return
                </span>
              </h1>
            </div>
            <div className="mx-auto mt-6 prose prose-lg text-gray-500 prose-primary">
              <p>
                The goal of Perfolio Analytics is to provide you all the valuable finance metrics at
                a glance in a simple yet modern analytics application.
              </p>
              <p>
                <strong>You might ask yourself:</strong> Why is this even important?
              </p>
              <p>
                It is no coincidence that institutional investors follow portfolio theory to
                optimize their clients’ portfolios by maximizing returns on their investments while
                keeping risks within the specified scope.
              </p>
              <p>
                Perfolio provides you the same financial information which nowadays only
                institutional investors possess. So that you can make data-driven investment
                decisions according to the latest trends in Finance.
              </p>
              <p>
                There are several ways to create an optimized portfolio. However, before doing so,
                one must first quantify the level of risk that is suitable to one’s own aspired
                returns on investments. Some people are risk takers, other people are risk averse.
              </p>
              <p>
                What asset managers and institutional investors are therefore doing is to understand
                their clients’ risk-appetite in order to make investment decisions in their client
                portfolios under the arranged paradigm.
              </p>
              <p>
                You should see now that a robust, portfolio risk analytics strategy is essential.
                Perfolio is your tool to help you with that!
              </p>
              <h2>Perfolio: More than just your ordinary stock portfolio.</h2>
              <p>
                Perfolio is your intuitive, all-in-one, independent and privacy-friendly extension
                of your classical stock portfolio. One aspect that makes Perfolio different from all
                the other stock portfolios you know from banks or neo-brokers is the fact that
                Perfolio brings all your assets into one place offering exceptional possibilities.
              </p>

              <p>
                Just think about it. Some of the following questions might have occurred before if
                you are investing:
              </p>
              <ul role="list">
                <li>
                  Is there any opportunity to bundle my investments such as cryptocurrencies, ETFs,
                  commodities and other assets into one place?
                </li>
                <li>How sustainable are my investments?</li>
                <li>How diversified are all my aggregated portfolios?</li>
                <li>Where can I find high quality finance data?</li>
              </ul>

              <p>
                This list could go on and on. Perfolio Analytics is your tool to shed light on all
                these questions. This will not only bring transparency into your investments, but
                also help you to make future decisions based on data, not on gut feeling.
              </p>

              <h2>
                Perfolio: No longer need to panic when looking at sustainability ratings.
              </h2>
              <p>
                Sustainability is mainly measured through environmental, social, and governance
                (ESG) aspects. Moreover, corporate social responsibility (CSR) and other ratings
                exist. Although this seems to be helpful, there remains one big problem:
              </p>
              <p>
                Sustainability key figures differ a lot. The same company can be assessed with
                different ESG-ratings. The reason for the divergent ESG-ratings are the various
                calculation approaches that finance institutions such as Bloomberg, MSCI, and
                RefinitivEikon utilize.
              </p>
              <p>
                For retail investors, it complicates sustainable investment decisions
              </p>
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
              <h2>Perfolio: Why metrics?</h2>
              <p>
                Broken down, metrics are a measurement of anything. The most classic measurement in
                the financial market is that of value. Be it, that of stocks, crypto or even real
                estate. Accordingly, everyone has encountered a measurement in some way. So, In
                order to see whether you have made a loss or a profit since the aquisition, you have
                to rely on a measurement. Therefore, measurement or metrics are essential when it
                comes to investments.
              </p>
              <p>
                However, at Perfolio, in addition to basic measurements such as the value, we
                provide you with a wide range of far more sophisticated metrics that allow you to
                obtain in-depth information about individual values in order to make the ultimate
                best investment decision. Moreover, we not only offer metrics for individual stocks,
                but also allow you to gain insights into your entire portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Privacy
