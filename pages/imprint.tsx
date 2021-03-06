import { Footer, Navbar, Section } from "@perfolio/ui/landing"
import { NextPage } from "next"
import React from "react"
// import { IndexPageProps } from "."

export interface ImprintPageProps {}

export const Imprint: NextPage<ImprintPageProps> = () => {
  return (
    <div>
      <div className="pt-16 -mt-16 bg-gray-50 ">
        <div className="fixed inset-x-0 top-0 z-20 bg-gray-50">
          <Navbar />
        </div>
        <Section className="mx-auto prose-sm prose sm:prose lg:prose-lg xl:prose-xl">
          <span>German only</span>
          <h1>Imprint / Impressum</h1>
          <h2>Angaben gemäß § 5 TMG</h2>
          <span>Hassel Jordt Kohler Meister Meister Thomas Webersinke GbR</span>
          <br></br>
          <span>Treibberg 9</span>
          <br></br>
          <span>90403 Nürnberg</span>
          <div className="flex flex-col">
            <span>Web: https://perfol.io</span>
            <span>Telefon: +49 (0) 160 155 1312</span>
            <span>E-Mail: info@perfol.io</span>
          </div>
          <h2>Vertreten durch:</h2>
          <div className="flex flex-col">
            <span>Tobias Hassel</span>
            <span>Mads Jordt</span>
            <span>Kevin Kohler</span>
            <span>Luis Meister</span>
            <span>Lukas Meister</span>
            <span>Andreas Thomas</span>
            <span>Nicolas Webersinke</span>
          </div>

          <h2>Online-Streitbeilegung (Art. 14 Abs. 1 ODR-Verordnung)</h2>
          <p>
            Die Europäische Kommission stellt unter{" "}
            <a href="ec.europa.eu/consumers/odr">ec.europa.eu/consumers/odr</a> eine Plattform zur
            Online-Streitbeilegung bereit.
          </p>

          <h2>Verantwortliche im Sinne von § 18 Abs. 2 MStV</h2>
          <div className="flex flex-col">
            <span>Nicolas Webersinke</span>
            <span>Marketing & Sales</span>
            <span>Treibberg 9</span>
            <span>90403 Nürnberg</span>
          </div>

          <h2>Social Media</h2>
          <p>
            Dieses Impressum gilt auch für unsere Social-Media-Profile auf
            <br />
            <span>
              Instagram:{" "}
              <a href="https://www.instagram.com/perfol.io">https://www.instagram.com/perfol.io</a>
            </span>
            <br />
            <span>
              Linkedin:{" "}
              <a href="https://www.linkedin.com/company/perfolio">
                https://www.linkedin.com/company/perfolio
              </a>
            </span>
          </p>
        </Section>
      </div>
      <Footer />
    </div>
  )
}

export default Imprint
