import React from "react"
import { Navbar, Section } from "../components"
import { NextPage, GetStaticProps } from "next"
import { getTranslations, useI18n } from "@perfolio/feature/i18n"

export interface PrivacyPageProps {
  translations: Record<string, string>
}

const Privacy: NextPage<PrivacyPageProps> = ({ translations }) => {
  const { t } = useI18n(translations)
  return (
    <div>
      <div className="pt-16 -mt-16 bg-gray-50 ">
        <div className="fixed inset-x-0 top-0 z-20 bg-gray-50">
          <Navbar />
        </div>
        <Section className="mx-auto prose-sm prose sm:prose lg:prose-lg xl:prose-xl">
          <h1>Datenschutzerklärung</h1>

          <h2>Einleitung</h2>

          <p>
            Mit der folgenden Datenschutzerklärung möchten wir Sie darüber aufklären, welche Arten
            Ihrer personenbezogenen Daten (nachfolgend auch kurz als &quot;Daten&quot; bezeichnet)
            wir zu welchen Zwecken und in welchem Umfang verarbeiten. Die Datenschutzerklärung gilt
            für alle von uns durchgeführten Verarbeitungen personenbezogener Daten, sowohl im Rahmen
            der Erbringung unserer Leistungen als auch insbesondere auf unseren Webseiten, in
            mobilen Applikationen sowie innerhalb externer Onlinepräsenzen, wie z.B. unserer
            Social-Media-Profile (nachfolgend zusammenfassend bezeichnet als
            &quot;Onlineangebot&quot;).
          </p>
          <p>Die verwendeten Begriffe sind nicht geschlechtsspezifisch.</p>
          <p>Stand: 21. August 2020</p>

          <h2>Inhaltsübersicht</h2>

          <ul>
            <li>
              <a className="py-4" href="#m14">
                Einleitung
              </a>
            </li>
            <li>
              <a className="py-4" href="#m3">
                Verantwortlicher
              </a>
            </li>
            <li>
              <a className="py-4" href="#mOverview">
                Übersicht der Verarbeitungen
              </a>
            </li>
            <li>
              <a className="py-4" href="#m13">
                Maßgebliche Rechtsgrundlagen
              </a>
            </li>
            <li>
              <a className="py-4" href="#m27">
                Sicherheitsmaßnahmen
              </a>
            </li>
            <li>
              <a className="py-4" href="#m24">
                Datenverarbeitung in Drittländern
              </a>
            </li>
            <li>
              <a className="py-4" href="#m134">
                Einsatz von Cookies
              </a>
            </li>
            <li>
              <a className="py-4" href="#m317">
                Kommerzielle und geschäftliche Leistungen
              </a>
            </li>
            <li>
              <a className="py-4" href="#m225">
                Bereitstellung des Onlineangebotes und Webhosting
              </a>
            </li>
            <li>
              <a className="py-4" href="#m367">
                Registrierung, Anmeldung und Nutzerkonto
              </a>
            </li>
            <li>
              <a className="py-4" href="#m182">
                Kontaktaufnahme
              </a>
            </li>
            <li>
              <a className="py-4" href="#m17">
                Newsletter und elektronische Benachrichtigungen
              </a>
            </li>
            <li>
              <a className="py-4" href="#m408">
                Umfragen und Befragungen
              </a>
            </li>
            <li>
              <a className="py-4" href="#m12">
                Löschung von Daten
              </a>
            </li>
            <li>
              <a className="py-4" href="#m15">
                Änderung und Aktualisierung der Datenschutzerklärung
              </a>
            </li>
            <li>
              <a className="py-4" href="#m10">
                Rechte der betroffenen Personen
              </a>
            </li>
            <li>
              <a className="py-4" href="#m42">
                Begriffsdefinitionen
              </a>
            </li>
          </ul>

          <h2 id="m3">Verantwortlicher</h2>

          <p>
            Webersinke Thomas Jordt Kohler GbR
            <br></br>
            Treibberg 9<br></br>
            90403 Nürnberg
          </p>
          <p>
            <strong>Vertretungsberechtigte Personen:</strong> Nicolas Webersinke, Andreas Thomas,
            Mads Jordt, Kevin Kohler
          </p>
          <p>
            <strong>E-Mail-Adresse:</strong> <a href="mailto:info@perfol.io">info@perfol.io</a>
          </p>
          <p>
            <strong>Impressum:</strong> perfol.io/imprint
          </p>

          <h2 id="mOverview">Übersicht der Verarbeitungen</h2>

          <p>
            Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer
            Verarbeitung zusammen und verweist auf die betroffenen Personen.
          </p>

          <h3>Arten der verarbeiteten Daten</h3>

          <ul>
            <li>Bestandsdaten (z.B. Namen, Adressen).</li>
            <li>Inhaltsdaten (z.B. Texteingaben, Fotografien, Videos).</li>
            <li>Kontaktdaten (z.B. E-Mail, Telefonnummern).</li>
            <li>Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen).</li>
            <li>Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten).</li>
            <li>Vertragsdaten (z.B. Vertragsgegenstand, Laufzeit, Kundenkategorie).</li>
            <li>Zahlungsdaten (z.B. Bankverbindungen, Rechnungen, Zahlungshistorie).</li>
          </ul>

          <h3>Kategorien betroffener Personen</h3>

          <ul>
            <li>Geschäfts- und Vertragspartner.</li>
            <li>Interessenten.</li>
            <li>Kommunikationspartner.</li>
            <li>Kunden.</li>
            <li>Nutzer (z.B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
          </ul>

          <h3>Zwecke der Verarbeitung</h3>

          <ul>
            <li>Büro- und Organisationsverfahren.</li>
            <li>Content Delivery Network (CDN).</li>
            <li>Direktmarketing (z.B. per E-Mail oder postalisch).</li>
            <li>Feedback (z.B. Sammeln von Feedback via Online-Formular).</li>
            <li>Kontaktanfragen und Kommunikation.</li>
            <li>Sicherheitsmaßnahmen.</li>
            <li>
              Tracking (z.B. interessens-/verhaltensbezogenes Profiling, Nutzung von Cookies).
            </li>
            <li>Vertragliche Leistungen und Service.</li>
            <li>Verwaltung und Beantwortung von Anfragen.</li>
          </ul>

          <h3 id="m13">Maßgebliche Rechtsgrundlagen</h3>

          <p>
            Im Folgenden teilen wir die Rechtsgrundlagen der Datenschutzgrundverordnung (DSGVO), auf
            deren Basis wir die personenbezogenen Daten verarbeiten, mit. Bitte beachten Sie, dass
            zusätzlich zu den Regelungen der DSGVO die nationalen Datenschutzvorgaben in Ihrem bzw.
            unserem Wohn- und Sitzland gelten können. Sollten ferner im Einzelfall speziellere
            Rechtsgrundlagen maßgeblich sein, teilen wir Ihnen diese in der Datenschutzerklärung
            mit.
          </p>
          <ul>
            <li>
              <strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO)</strong> - Die betroffene
              Person hat ihre Einwilligung in die Verarbeitung der sie betreffenden
              personenbezogenen Daten für einen spezifischen Zweck oder mehrere bestimmte Zwecke
              gegeben.
            </li>
            <li>
              <strong>
                Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b. DSGVO)
              </strong>{" "}
              - Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die
              betroffene Person ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich,
              die auf Anfrage der betroffenen Person erfolgen.
            </li>
            <li>
              <strong>Rechtliche Verpflichtung (Art. 6 Abs. 1 S. 1 lit. c. DSGVO)</strong> - Die
              Verarbeitung ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich, der der
              Verantwortliche unterliegt.
            </li>
            <li>
              <strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO)</strong> - Die
              Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder
              eines Dritten erforderlich, sofern nicht die Interessen oder Grundrechte und
              Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten
              erfordern, überwiegen.
            </li>
          </ul>
          <p>
            <strong>Nationale Datenschutzregelungen in Deutschland</strong>: Zusätzlich zu den
            Datenschutzregelungen der Datenschutz-Grundverordnung gelten nationale Regelungen zum
            Datenschutz in Deutschland. Hierzu gehört insbesondere das Gesetz zum Schutz vor
            Missbrauch personenbezogener Daten bei der Datenverarbeitung (Bundesdatenschutzgesetz –
            BDSG). Das BDSG enthält insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht
            auf Löschung, zum Widerspruchsrecht, zur Verarbeitung besonderer Kategorien
            personenbezogener Daten, zur Verarbeitung für andere Zwecke und zur Übermittlung sowie
            automatisierten Entscheidungsfindung im Einzelfall einschließlich Profiling. Des
            Weiteren regelt es die Datenverarbeitung für Zwecke des Beschäftigungsverhältnisses (§
            26 BDSG), insbesondere im Hinblick auf die Begründung, Durchführung oder Beendigung von
            Beschäftigungsverhältnissen sowie die Einwilligung von Beschäftigten. Ferner können
            Landesdatenschutzgesetze der einzelnen Bundesländer zur Anwendung gelangen.
          </p>

          <h2 id="m27">Sicherheitsmaßnahmen</h2>

          <p>
            Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der
            Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der
            Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und
            des Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete
            technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau
            zu gewährleisten.
          </p>
          <p>
            Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und
            Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den
            Daten als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung
            der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die
            eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten und Reaktionen auf die
            Gefährdung der Daten gewährleisten. Ferner berücksichtigen wir den Schutz
            personenbezogener Daten bereits bei der Entwicklung bzw. Auswahl von Hardware, Software
            sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch Technikgestaltung und
            durch datenschutzfreundliche Voreinstellungen.
          </p>
          <p>
            <strong>SSL-Verschlüsselung (https)</strong>: Um Ihre via unser Online-Angebot
            übermittelten Daten zu schützen, nutzen wir eine SSL-Verschlüsselung. Sie erkennen
            derart verschlüsselte Verbindungen an dem Präfix https:// in der Adresszeile Ihres
            Browsers.
          </p>

          <h2 id="m24">Datenverarbeitung in Drittländern</h2>

          <p>
            Sofern wir Daten in einem Drittland (d.h., außerhalb der Europäischen Union (EU), des
            Europäischen Wirtschaftsraums (EWR)) verarbeiten oder die Verarbeitung im Rahmen der
            Inanspruchnahme von Diensten Dritter oder der Offenlegung bzw. Übermittlung von Daten an
            andere Personen, Stellen oder Unternehmen stattfindet, erfolgt dies nur im Einklang mit
            den gesetzlichen Vorgaben.
          </p>
          <p>
            Vorbehaltlich ausdrücklicher Einwilligung oder vertraglich oder gesetzlich
            erforderlicher Übermittlung verarbeiten oder lassen wir die Daten nur in Drittländern
            mit einem anerkannten Datenschutzniveau, vertraglichen Verpflichtung durch sogenannte
            Standardschutzklauseln der EU-Kommission, beim Vorliegen von Zertifizierungen oder
            verbindlicher internen Datenschutzvorschriften verarbeiten (Art. 44 bis 49 DSGVO,
            Informationsseite der EU-Kommission:
            <a
              href="https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de"
              target="_blank"
              rel="noreferrer"
            >
              https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de
            </a>
            ).
          </p>

          <h2 id="m134">Einsatz von Cookies</h2>

          <p>
            Cookies sind Textdateien, die Daten von besuchten Websites oder Domains enthalten und
            von einem Browser auf dem Computer des Benutzers gespeichert werden. Ein Cookie dient in
            erster Linie dazu, die Informationen über einen Benutzer während oder nach seinem Besuch
            innerhalb eines Onlineangebotes zu speichern. Zu den gespeicherten Angaben können z.B.
            die Spracheinstellungen auf einer Webseite, der Signinstatus, ein Warenkorb oder die
            Stelle, an der ein Video geschaut wurde, gehören. Zu dem Begriff der Cookies zählen wir
            ferner andere Technologien, die die gleichen Funktionen wie Cookies erfüllen (z.B., wenn
            Angaben der Nutzer anhand pseudonymer Onlinekennzeichnungen gespeichert werden, auch als
            &quot;Nutzer-IDs&quot; bezeichnet)
          </p>
          <p>
            <strong>Die folgenden Cookie-Typen und Funktionen werden unterschieden:</strong>
          </p>
          <ul>
            <li>
              <strong>Temporäre Cookies (auch: Session- oder Sitzungs-Cookies):</strong> Temporäre
              Cookies werden spätestens gelöscht, nachdem ein Nutzer ein Online-Angebot verlassen
              und seinen Browser geschlossen hat.
            </li>
            <li>
              <strong>Permanente Cookies:</strong> Permanente Cookies bleiben auch nach dem
              Schließen des Browsers gespeichert. So kann beispielsweise der Signin-Status
              gespeichert oder bevorzugte Inhalte direkt angezeigt werden, wenn der Nutzer eine
              Website erneut besucht. Ebenso können die Interessen von Nutzern, die zur
              Reichweitenmessung oder zu Marketingzwecken verwendet werden, in einem solchen Cookie
              gespeichert werden.
            </li>
            <li>
              <strong>First-Party-Cookies:</strong> First-Party-Cookies werden von uns selbst
              gesetzt.
            </li>
            <li>
              <strong>Third-Party-Cookies (auch: Drittanbieter-Cookies)</strong>:
              Drittanbieter-Cookies werden hauptsächlich von Werbetreibenden (sog. Dritten)
              verwendet, um Benutzerinformationen zu verarbeiten.
            </li>
            <li>
              <strong>Notwendige (auch: essentielle oder unbedingt erforderliche) Cookies:</strong>{" "}
              Cookies können zum einen für den Betrieb einer Webseite unbedingt erforderlich sein
              (z.B. um Signins oder andere Nutzereingaben zu speichern oder aus Gründen der
              Sicherheit).
            </li>
            <li>
              <strong>Statistik-, Marketing- und Personalisierungs-Cookies</strong>: Ferner werden
              Cookies im Regelfall auch im Rahmen der Reichweitenmessung eingesetzt sowie dann, wenn
              die Interessen eines Nutzers oder sein Verhalten (z.B. Betrachten bestimmter Inhalte,
              Nutzen von Funktionen etc.) auf einzelnen Webseiten in einem Nutzerprofil gespeichert
              werden. Solche Profile dienen dazu, den Nutzern z.B. Inhalte anzuzeigen, die ihren
              potentiellen Interessen entsprechen. Dieses Verfahren wird auch als
              &quot;Tracking&quot;, d.h., Nachverfolgung der potentiellen Interessen der Nutzer
              bezeichnet. . Soweit wir Cookies oder &quot;Tracking&quot;-Technologien einsetzen,
              informieren wir Sie gesondert in unserer Datenschutzerklärung oder im Rahmen der
              Einholung einer Einwilligung.
            </li>
          </ul>

          <p>
            <strong>Hinweise zu Rechtsgrundlagen: </strong> Auf welcher Rechtsgrundlage wir Ihre
            personenbezogenen Daten mit Hilfe von Cookies verarbeiten, hängt davon ab, ob wir Sie um
            eine Einwilligung bitten. Falls dies zutrifft und Sie in die Nutzung von Cookies
            einwilligen, ist die Rechtsgrundlage der Verarbeitung Ihrer Daten die erklärte
            Einwilligung. Andernfalls werden die mithilfe von Cookies verarbeiteten Daten auf
            Grundlage unserer berechtigten Interessen (z.B. an einem betriebswirtschaftlichen
            Betrieb unseres Onlineangebotes und dessen Verbesserung) verarbeitet oder, wenn der
            Einsatz von Cookies erforderlich ist, um unsere vertraglichen Verpflichtungen zu
            erfüllen.
          </p>
          <p>
            <strong>Speicherdauer: </strong>Sofern wir Ihnen keine expliziten Angaben zur
            Speicherdauer von permanenten Cookies mitteilen (z. B. im Rahmen eines sog.
            Cookie-Opt-Ins), gehen Sie bitte davon aus, dass die Speicherdauer bis zu zwei Jahre
            betragen kann.
          </p>
          <p>
            <strong>Allgemeine Hinweise zum Widerruf und Widerspruch (Opt-Out): </strong> Abhängig
            davon, ob die Verarbeitung auf Grundlage einer Einwilligung oder gesetzlichen Erlaubnis
            erfolgt, haben Sie jederzeit die Möglichkeit, eine erteilte Einwilligung zu widerrufen
            oder der Verarbeitung Ihrer Daten durch Cookie-Technologien zu widersprechen
            (zusammenfassend als &quot;Opt-Out&quot; bezeichnet). Sie können Ihren Widerspruch
            zunächst mittels der Einstellungen Ihres Browsers erklären, z.B., indem Sie die Nutzung
            von Cookies deaktivieren (wobei hierdurch auch die Funktionsfähigkeit unseres
            Onlineangebotes eingeschränkt werden kann). Ein Widerspruch gegen den Einsatz von
            Cookies zu Zwecken des Onlinemarketings kann auch mittels einer Vielzahl von Diensten,
            vor allem im Fall des Trackings, über die Webseiten{" "}
            <a href="https://optout.aboutads.info" target="_blank" rel="noreferrer">
              https://optout.aboutads.info
            </a>{" "}
            und{" "}
            <a href="https://www.youronlinechoices.com/" target="_blank" rel="noreferrer">
              https://www.youronlinechoices.com/
            </a>{" "}
            erklärt werden. Daneben können Sie weitere Widerspruchshinweise im Rahmen der Angaben zu
            den eingesetzten Dienstleistern und Cookies erhalten.
          </p>
          <p>
            <strong>Verarbeitung von Cookie-Daten auf Grundlage einer Einwilligung</strong>: Bevor
            wir Daten im Rahmen der Nutzung von Cookies verarbeiten oder verarbeiten lassen, bitten
            wir die Nutzer um eine jederzeit widerrufbare Einwilligung. Bevor die Einwilligung nicht
            ausgesprochen wurde, werden allenfalls Cookies eingesetzt, die für den Betrieb unseres
            Onlineangebotes unbedingt erforderlich sind.
          </p>
          <ul>
            <li>
              <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z.B. besuchte Webseiten,
              Interesse an Inhalten, Zugriffszeiten), Meta-/Kommunikationsdaten (z.B.
              Geräte-Informationen, IP-Adressen).
            </li>
            <li>
              <strong>Betroffene Personen:</strong> Nutzer (z.B. Webseitenbesucher, Nutzer von
              Onlinediensten).
            </li>
            <li>
              <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO),
              Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO).
            </li>
          </ul>

          <h2 id="m317">Kommerzielle und geschäftliche Leistungen</h2>

          <p>
            Wir verarbeiten Daten unserer Vertrags- und Geschäftspartner, z.B. Kunden und
            Interessenten (zusammenfassend bezeichnet als &quot;Vertragspartner&quot;) im Rahmen von
            vertraglichen und vergleichbaren Rechtsverhältnissen sowie damit verbundenen Maßnahmen
            und im Rahmen der Kommunikation mit den Vertragspartnern (oder vorvertraglich), z.B., um
            Anfragen zu beantworten.
          </p>
          <p>
            Diese Daten verarbeiten wir zur Erfüllung unserer vertraglichen Pflichten, zur Sicherung
            unserer Rechte und zu Zwecken der mit diesen Angaben einhergehenden Verwaltungsaufgaben
            sowie der unternehmerischen Organisation. Die Daten der Vertragspartner geben wir im
            Rahmen des geltenden Rechts nur insoweit an Dritte weiter, als dies zu den vorgenannten
            Zwecken oder zur Erfüllung gesetzlicher Pflichten erforderlich ist oder mit Einwilligung
            der betroffenen Personen erfolgt (z.B. an beteiligte Telekommunikations-, Transport- und
            sonstige Hilfsdienste sowie Subunternehmer, Banken, Steuer- und Rechtsberater,
            Zahlungsdienstleister oder Steuerbehörden). Über weitere Verarbeitungsformen, z.B. zu
            Zwecken des Marketings, werden die Vertragspartner im Rahmen dieser Datenschutzerklärung
            informiert.
          </p>
          <p>
            Welche Daten für die vorgenannten Zwecke erforderlich sind, teilen wir den
            Vertragspartnern vor oder im Rahmen der Datenerhebung, z.B. in Onlineformularen, durch
            besondere Kennzeichnung (z.B. Farben) bzw. Symbole (z.B. Sternchen o.ä.), oder
            persönlich mit.
          </p>
          <p>
            Wir löschen die Daten nach Ablauf gesetzlicher Gewährleistungs- und vergleichbarer
            Pflichten, d.h., grundsätzlich nach Ablauf von 4 Jahren, es sei denn, dass die Daten in
            einem Kundenkonto gespeichert werden, z.B., solange sie aus gesetzlichen Gründen der
            Archivierung aufbewahrt werden müssen (z.B. für Steuerzwecke im Regelfall 10 Jahre).
            Daten, die uns im Rahmen eines Auftrags durch den Vertragspartner offengelegt wurden,
            löschen wir entsprechend den Vorgaben des Auftrags, grundsätzlich nach Ende des
            Auftrags.
          </p>
          <p>
            Soweit wir zur Erbringung unserer Leistungen Drittanbieter oder Plattformen einsetzen,
            gelten im Verhältnis zwischen den Nutzern und den Anbietern die Geschäftsbedingungen und
            Datenschutzhinweise der jeweiligen Drittanbieter oder Plattformen.
          </p>
          <p>
            <strong>Kundenkonto</strong>: Vertragspartner können innerhalb unseres Onlineangebotes
            ein Konto anlegen (z.B. Kunden- bzw. Nutzerkonto, kurz &quot;Kundenkonto&quot;). Falls
            die Registrierung eines Kundenkontos erforderlich ist, werden Vertragspartner hierauf
            ebenso hingewiesen wie auf die für die Registrierung erforderlichen Angaben. Die
            Kundenkonten sind nicht öffentlich und können von Suchmaschinen nicht indexiert werden.
            Im Rahmen der Registrierung sowie anschließender Anmeldungen und Nutzungen des
            Kundenkontos speichern wir die IP-Adressen der Kunden nebst den Zugriffszeitpunkten, um
            die Registrierung nachweisen und etwaigem Missbrauch des Kundenkontos vorbeugen zu
            können.
          </p>
          <p>
            Wenn Kunden ihr Kundenkonto gekündigt haben, werden die das Kundenkonto betreffenden
            Daten gelöscht, vorbehaltlich, deren Aufbewahrung ist aus gesetzlichen Gründen
            erforderlich. Es obliegt den Kunden, ihre Daten bei erfolgter Kündigung des Kundenkontos
            zu sichern.
          </p>
          <p>
            <strong>Angebot von Software- und Plattformleistungen</strong>: Wir verarbeiten die
            Daten unserer Nutzer, angemeldeter und etwaiger Testnutzer (nachfolgend einheitlich als
            &quot;Nutzer&quot; bezeichnet), um ihnen gegenüber unsere vertraglichen Leistungen
            erbringen zu können sowie auf Grundlage berechtigter Interessen, um die Sicherheit
            unseres Angebotes gewährleisten und es weiterentwickeln zu können. Die erforderlichen
            Angaben sind als solche im Rahmen des Auftrags-, Bestell- bzw. vergleichbaren
            Vertragsschlusses gekennzeichnet und umfassen die zur Leistungserbringung und Abrechnung
            benötigten Angaben sowie Kontaktinformationen, um etwaige Rücksprachen halten zu können.
          </p>
          <ul>
            <li>
              <strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z.B. Namen, Adressen),
              Zahlungsdaten (z.B. Bankverbindungen, Rechnungen, Zahlungshistorie), Kontaktdaten
              (z.B. E-Mail, Telefonnummern), Vertragsdaten (z.B. Vertragsgegenstand, Laufzeit,
              Kundenkategorie), Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten,
              Zugriffszeiten), Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen).
            </li>
            <li>
              <strong>Betroffene Personen:</strong> Interessenten, Geschäfts- und Vertragspartner,
              Kunden.
            </li>
            <li>
              <strong>Zwecke der Verarbeitung:</strong> Vertragliche Leistungen und Service,
              Kontaktanfragen und Kommunikation, Büro- und Organisationsverfahren, Verwaltung und
              Beantwortung von Anfragen, Sicherheitsmaßnahmen.
            </li>
            <li>
              <strong>Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche Anfragen
              (Art. 6 Abs. 1 S. 1 lit. b. DSGVO), Rechtliche Verpflichtung (Art. 6 Abs. 1 S. 1 lit.
              c. DSGVO), Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO).
            </li>
          </ul>

          <h2 id="m225">Bereitstellung des Onlineangebotes und Webhosting</h2>

          <p>
            Um unser Onlineangebot sicher und effizient bereitstellen zu können, nehmen wir die
            Leistungen von einem oder mehreren Webhosting-Anbietern in Anspruch, von deren Servern
            (bzw. von ihnen verwalteten Servern) das Onlineangebot abgerufen werden kann. Zu diesen
            Zwecken können wir Infrastruktur- und Plattformdienstleistungen, Rechenkapazität,
            Speicherplatz und Datenbankdienste sowie Sicherheitsleistungen und technische
            Wartungsleistungen in Anspruch nehmen.
          </p>
          <p>
            Zu den im Rahmen der Bereitstellung des Hostingangebotes verarbeiteten Daten können alle
            die Nutzer unseres Onlineangebotes betreffenden Angaben gehören, die im Rahmen der
            Nutzung und der Kommunikation anfallen. Hierzu gehören regelmäßig die IP-Adresse, die
            notwendig ist, um die Inhalte von Onlineangeboten an Browser ausliefern zu können, und
            alle innerhalb unseres Onlineangebotes oder von Webseiten getätigten Eingaben.
          </p>
          <p>
            <strong>Erhebung von Zugriffsdaten und Logfiles</strong>: Wir selbst (bzw. unser
            Webhostinganbieter) erheben Daten zu jedem Zugriff auf den Server (sogenannte
            Serverlogfiles). Zu den Serverlogfiles können die Adresse und Name der abgerufenen
            Webseiten und Dateien, Datum und Uhrzeit des Abrufs, übertragene Datenmengen, Meldung
            über erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers,
            Referrer URL (die zuvor besuchte Seite) und im Regelfall IP-Adressen und der anfragende
            Provider gehören.
          </p>
          <p>
            Die Serverlogfiles können zum einen zu Zwecken der Sicherheit eingesetzt werden, z.B.,
            um eine Überlastung der Server zu vermeiden (insbesondere im Fall von missbräuchlichen
            Angriffen, sogenannten DDoS-Attacken) und zum anderen, um die Auslastung der Server und
            ihre Stabilität sicherzustellen.
          </p>
          <p>
            <strong>Content-Delivery-Network</strong>: Wir setzen ein
            &quot;Content-Delivery-Network&quot; (CDN) ein. Ein CDN ist ein Dienst, mit dessen Hilfe
            Inhalte eines Onlineangebotes, insbesondere große Mediendateien, wie Grafiken oder
            Programm-Skripte, mit Hilfe regional verteilter und über das Internet verbundener Server
            schneller und sicherer ausgeliefert werden können.
          </p>
          <ul>
            <li>
              <strong>Verarbeitete Datenarten:</strong> Inhaltsdaten (z.B. Texteingaben,
              Fotografien, Videos), Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten,
              Zugriffszeiten), Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen).
            </li>
            <li>
              <strong>Betroffene Personen:</strong> Nutzer (z.B. Webseitenbesucher, Nutzer von
              Onlinediensten).
            </li>
            <li>
              <strong>Zwecke der Verarbeitung:</strong> Content Delivery Network (CDN).
            </li>
            <li>
              <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f.
              DSGVO).
            </li>
          </ul>

          <h2 id="m367">Registrierung, Anmeldung und Nutzerkonto</h2>

          <p>
            Nutzer können ein Nutzerkonto anlegen. Im Rahmen der Registrierung werden den Nutzern
            die erforderlichen Pflichtangaben mitgeteilt und zu Zwecken der Bereitstellung des
            Nutzerkontos auf Grundlage vertraglicher Pflichterfüllung verarbeitet. Zu den
            verarbeiteten Daten gehören insbesondere die Signin-Informationen (Name, Passwort sowie
            eine E-Mail-Adresse). Die im Rahmen der Registrierung eingegebenen Daten werden für die
            Zwecke der Nutzung des Nutzerkontos und dessen Zwecks verwendet.{" "}
          </p>
          <p>
            Die Nutzer können über Vorgänge, die für deren Nutzerkonto relevant sind, wie z.B.
            technische Änderungen, per E-Mail informiert werden. Wenn Nutzer ihr Nutzerkonto
            gekündigt haben, werden deren Daten im Hinblick auf das Nutzerkonto, vorbehaltlich einer
            gesetzlichen Aufbewahrungspflicht, gelöscht. Es obliegt den Nutzern, ihre Daten bei
            erfolgter Kündigung vor dem Vertragsende zu sichern. Wir sind berechtigt, sämtliche
            während der Vertragsdauer gespeicherte Daten des Nutzers unwiederbringlich zu löschen.
          </p>
          <p>
            Im Rahmen der Inanspruchnahme unserer Registrierungs- und Anmeldefunktionen sowie der
            Nutzung des Nutzerkontos speichern wir die IP-Adresse und den Zeitpunkt der jeweiligen
            Nutzerhandlung. Die Speicherung erfolgt auf Grundlage unserer berechtigten Interessen
            als auch jener der Nutzer an einem Schutz vor Missbrauch und sonstiger unbefugter
            Nutzung. Eine Weitergabe dieser Daten an Dritte erfolgt grundsätzlich nicht, es sei
            denn, sie ist zur Verfolgung unserer Ansprüche erforderlich oder es besteht eine
            gesetzliche Verpflichtung hierzu.
          </p>
          <ul>
            <li>
              <strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z.B. Namen, Adressen),
              Kontaktdaten (z.B. E-Mail, Telefonnummern), Inhaltsdaten (z.B. Texteingaben,
              Fotografien, Videos), Meta-/Kommunikationsdaten (z.B. Geräte-Informationen,
              IP-Adressen).
            </li>
            <li>
              <strong>Betroffene Personen:</strong> Nutzer (z.B. Webseitenbesucher, Nutzer von
              Onlinediensten).
            </li>
            <li>
              <strong>Zwecke der Verarbeitung:</strong> Vertragliche Leistungen und Service,
              Sicherheitsmaßnahmen, Verwaltung und Beantwortung von Anfragen.
            </li>
            <li>
              <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO),
              Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b. DSGVO),
              Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO).
            </li>
          </ul>

          <h2 id="m182">Kontaktaufnahme</h2>

          <p>
            Bei der Kontaktaufnahme mit uns (z.B. per Kontaktformular, E-Mail, Telefon oder via
            soziale Medien) werden die Angaben der anfragenden Personen verarbeitet, soweit dies zur
            Beantwortung der Kontaktanfragen und etwaiger angefragter Maßnahmen erforderlich ist.
          </p>
          <p>
            Die Beantwortung der Kontaktanfragen im Rahmen von vertraglichen oder vorvertraglichen
            Beziehungen erfolgt zur Erfüllung unserer vertraglichen Pflichten oder zur Beantwortung
            von (vor)vertraglichen Anfragen und im Übrigen auf Grundlage der berechtigten Interessen
            an der Beantwortung der Anfragen.
          </p>
          <ul>
            <li>
              <strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z.B. Namen, Adressen),
              Kontaktdaten (z.B. E-Mail, Telefonnummern), Inhaltsdaten (z.B. Texteingaben,
              Fotografien, Videos).
            </li>
            <li>
              <strong>Betroffene Personen:</strong> Kommunikationspartner.
            </li>
            <li>
              <strong>Zwecke der Verarbeitung:</strong> Kontaktanfragen und Kommunikation.
            </li>
            <li>
              <strong>Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche Anfragen
              (Art. 6 Abs. 1 S. 1 lit. b. DSGVO), Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f.
              DSGVO).
            </li>
          </ul>

          <h2 id="m17">Newsletter und elektronische Benachrichtigungen</h2>

          <p>
            Wir versenden Newsletter, E-Mails und weitere elektronische Benachrichtigungen
            (nachfolgend &quot;Newsletter&quot;) nur mit der Einwilligung der Empfänger oder einer
            gesetzlichen Erlaubnis. Sofern im Rahmen einer Anmeldung zum Newsletter dessen Inhalte
            konkret umschrieben werden, sind sie für die Einwilligung der Nutzer maßgeblich. Im
            Übrigen enthalten unsere Newsletter Informationen zu unseren Leistungen und uns.
          </p>
          <p>
            Um sich zu unseren Newslettern anzumelden, reicht es grundsätzlich aus, wenn Sie Ihre
            E-Mail-Adresse angeben. Wir können Sie jedoch bitten, einen Namen, zwecks persönlicher
            Ansprache im Newsletter, oder weitere Angaben, sofern diese für die Zwecke des
            Newsletters erforderlich sind, zu tätigen.
          </p>
          <p>
            <strong>Double-Opt-In-Verfahren:</strong> Die Anmeldung zu unserem Newsletter erfolgt
            grundsätzlich in einem sogenannte Double-Opt-In-Verfahren. D.h., Sie erhalten nach der
            Anmeldung eine E-Mail, in der Sie um die Bestätigung Ihrer Anmeldung gebeten werden.
            Diese Bestätigung ist notwendig, damit sich niemand mit fremden E-Mail-Adressen anmelden
            kann. Die Anmeldungen zum Newsletter werden protokolliert, um den Anmeldeprozess
            entsprechend den rechtlichen Anforderungen nachweisen zu können. Hierzu gehört die
            Speicherung des Anmelde- und des Bestätigungszeitpunkts als auch der IP-Adresse. Ebenso
            werden die Änderungen Ihrer bei dem Versanddienstleister gespeicherten Daten
            protokolliert.
          </p>
          <p>
            <strong>Löschung und Einschränkung der Verarbeitung: </strong> Wir können die
            ausgetragenen E-Mail-Adressen bis zu drei Jahren auf Grundlage unserer berechtigten
            Interessen speichern, bevor wir sie löschen, um eine ehemals gegebene Einwilligung
            nachweisen zu können. Die Verarbeitung dieser Daten wird auf den Zweck einer möglichen
            Abwehr von Ansprüchen beschränkt. Ein individueller Löschungsantrag ist jederzeit
            möglich, sofern zugleich das ehemalige Bestehen einer Einwilligung bestätigt wird. Im
            Fall von Pflichten zur dauerhaften Beachtung von Widersprüchen behalten wir uns die
            Speicherung der E-Mail-Adresse alleine zu diesem Zweck in einer Sperrliste (sogenannte
            &quot;Blacklist&quot;) vor.
          </p>
          <p>
            Die Protokollierung des Anmeldeverfahrens erfolgt auf Grundlage unserer berechtigten
            Interessen zu Zwecken des Nachweises seines ordnungsgemäßen Ablaufs. Soweit wir einen
            Dienstleister mit dem Versand von E-Mails beauftragen, erfolgt dies auf Grundlage
            unserer berechtigten Interessen an einem effizienten und sicheren Versandsystem.
          </p>
          <p>
            <strong>Hinweise zu Rechtsgrundlagen:</strong> Der Versand der Newsletter erfolgt auf
            Grundlage einer Einwilligung der Empfänger oder, falls eine Einwilligung nicht
            erforderlich ist, auf Grundlage unserer berechtigten Interessen am Direktmarketing,
            sofern und soweit diese gesetzlich, z.B. im Fall von Bestandskundenwerbung, erlaubt ist.
            Soweit wir einen Dienstleister mit dem Versand von E-Mails beauftragen, geschieht dies
            auf der Grundlage unserer berechtigten Interessen. Das Registrierungsverfahren wird auf
            der Grundlage unserer berechtigten Interessen aufgezeichnet, um nachzuweisen, dass es in
            Übereinstimmung mit dem Gesetz durchgeführt wurde.
          </p>
          <p>
            <strong>Inhalte:</strong> Informationen zu uns, unseren Leistungen, Aktionen und
            Angeboten.
          </p>
          <p>
            <strong>Analyse und Erfolgsmessung</strong>: Die Newsletter enthalten einen sogenannte
            &quot;web-beacon&quot;, d.h., eine pixelgroße Datei, die beim Öffnen des Newsletters von
            unserem Server, bzw., sofern wir einen Versanddienstleister einsetzen, von dessen Server
            abgerufen wird. Im Rahmen dieses Abrufs werden zunächst technische Informationen, wie
            Informationen zum Browser und Ihrem System, als auch Ihre IP-Adresse und der Zeitpunkt
            des Abrufs, erhoben.
          </p>
          <p>
            Diese Informationen werden zur technischen Verbesserung unseres Newsletters anhand der
            technischen Daten oder der Zielgruppen und ihres Leseverhaltens auf Basis ihrer
            Abruforte (die mit Hilfe der IP-Adresse bestimmbar sind) oder der Zugriffszeiten
            genutzt. Diese Analyse beinhaltet ebenfalls die Feststellung, ob die Newsletter geöffnet
            werden, wann sie geöffnet werden und welche Links geklickt werden. Diese Informationen
            können aus technischen Gründen zwar den einzelnen Newsletterempfängern zugeordnet
            werden. Es ist jedoch weder unser Bestreben noch, sofern eingesetzt, das des
            Versanddienstleisters, einzelne Nutzer zu beobachten. Die Auswertungen dienen uns
            vielmehr dazu, die Lesegewohnheiten unserer Nutzer zu erkennen und unsere Inhalte an sie
            anzupassen oder unterschiedliche Inhalte entsprechend den Interessen unserer Nutzer zu
            versenden.
          </p>
          <p>
            Die Auswertung des Newsletters und die Erfolgsmessung erfolgen, vorbehaltlich einer
            ausdrücklichen Einwilligung der Nutzer, auf Grundlage unserer berechtigten Interessen zu
            Zwecken des Einsatzes eines nutzerfreundlichen sowie sicheren Newslettersystems, welches
            sowohl unseren geschäftlichen Interessen dient, als auch den Erwartungen der Nutzer
            entspricht.
          </p>
          <p>
            Ein getrennter Widerruf der Erfolgsmessung ist leider nicht möglich, in diesem Fall muss
            das gesamte Newsletterabonnement gekündigt, bzw. muss ihm widersprochen werden.
          </p>
          <ul>
            <li>
              <strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z.B. Namen, Adressen),
              Kontaktdaten (z.B. E-Mail, Telefonnummern), Meta-/Kommunikationsdaten (z.B.
              Geräte-Informationen, IP-Adressen), Nutzungsdaten (z.B. besuchte Webseiten, Interesse
              an Inhalten, Zugriffszeiten).
            </li>
            <li>
              <strong>Betroffene Personen:</strong> Kommunikationspartner.
            </li>
            <li>
              <strong>Zwecke der Verarbeitung:</strong> Direktmarketing (z.B. per E-Mail oder
              postalisch).
            </li>
            <li>
              <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO),
              Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO).
            </li>
            <li>
              <strong>Widerspruchsmöglichkeit (Opt-Out):</strong> Sie können den Empfang unseres
              Newsletters jederzeit kündigen, d.h. Ihre Einwilligungen widerrufen, bzw. dem weiteren
              Empfang widersprechen. Einen Link zur Kündigung des Newsletters finden Sie entweder am
              Ende eines jeden Newsletters oder können sonst eine der oben angegebenen
              Kontaktmöglichkeiten, vorzugswürdig E-Mail, hierzu nutzen.
            </li>
          </ul>

          <p>
            <strong>Eingesetzte Dienste und Diensteanbieter:</strong>
          </p>

          {/*
           */}
          <ul>
            <li>
              <strong>Mailchimp:</strong> E-Mail-Marketing-Plattform; Dienstanbieter:
              &quot;Mailchimp&quot; - Rocket Science Group, LLC, 675 Ponce De Leon Ave NE #5000,
              Atlanta, GA 30308, USA; Website:{" "}
              <a href="https://mailchimp.com" target="_blank" rel="noreferrer">
                https://mailchimp.com
              </a>
              ; Datenschutzerklärung:{" "}
              <a href="https://mailchimp.com/legal/privacy/" target="_blank" rel="noreferrer">
                https://mailchimp.com/legal/privacy/
              </a>
              .
            </li>
          </ul>
          <h2 id="m408">Umfragen und Befragungen</h2>

          <p>
            Die von uns durchgeführten Umfragen und Befragungen (nachfolgend
            &quot;Befragungen&quot;) werden anonym ausgewertet. Eine Verarbeitung personenbezogener
            Daten erfolgt nur insoweit, als dies zu Bereitstellung und technischen Durchführung der
            Umfragen erforderlich ist (z.B. Verarbeitung der IP-Adresse, um die Umfrage im Browser
            des Nutzers darzustellen oder mithilfe eines temporären Cookies (Session-Cookie) eine
            Wiederaufnahme der Umfrage zu ermöglichen) oder Nutzer eingewilligt haben.
          </p>
          <p>
            <strong>Hinweise zu Rechtsgrundlagen:</strong> Sofern wir die Teilnehmer um eine
            Einwilligung in die Verarbeitung iherer Daten bitten, ist diese Rechtsgrundlage der
            Verarbeitung, ansonsten erfolgt die Verarbeitung der Daten der Teilnehmer auf Grundlage
            unserer berechtigten Interessen an der Durchführung einer objektiven Umfrage.
          </p>
          <ul>
            <li>
              <strong>Verarbeitete Datenarten:</strong> Kontaktdaten (z.B. E-Mail, Telefonnummern),
              Inhaltsdaten (z.B. Texteingaben, Fotografien, Videos), Nutzungsdaten (z.B. besuchte
              Webseiten, Interesse an Inhalten, Zugriffszeiten), Meta-/Kommunikationsdaten (z.B.
              Geräte-Informationen, IP-Adressen).
            </li>
            <li>
              <strong>Betroffene Personen:</strong> Kommunikationspartner, Nutzer (z.B.
              Webseitenbesucher, Nutzer von Onlinediensten).
            </li>
            <li>
              <strong>Zwecke der Verarbeitung:</strong> Kontaktanfragen und Kommunikation,
              Direktmarketing (z.B. per E-Mail oder postalisch), Tracking (z.B.
              interessens-/verhaltensbezogenes Profiling, Nutzung von Cookies), Feedback (z.B.
              Sammeln von Feedback via Online-Formular).
            </li>
            <li>
              <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO),
              Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO).
            </li>
          </ul>
          <p>
            <strong>Eingesetzte Dienste und Diensteanbieter:</strong>
          </p>
          <ul>
            <li>
              <strong>Google-Formular:</strong> Google-Cloud-Formulare; Dienstanbieter: Google
              Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, Mutterunternehmen:
              Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA; Website:{" "}
              <a href="https://firebase.google.com" target="_blank" rel="noreferrer">
                https://firebase.google.com
              </a>
              ; Datenschutzerklärung:{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                https://policies.google.com/privacy
              </a>
              ; Widerspruchsmöglichkeit (Opt-Out): Opt-Out-Plugin:{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout?hl=de"
                target="_blank"
                rel="noreferrer"
              >
                https://tools.google.com/dlpage/gaoptout?hl=de
              </a>
              , Einstellungen für die Darstellung von Werbeeinblendungen:{" "}
              <a
                href="https://adssettings.google.com/authenticated"
                target="_blank"
                rel="noreferrer"
              >
                https://adssettings.google.com/authenticated
              </a>
              .
            </li>
          </ul>

          <h2 id="m12">Löschung von Daten</h2>

          <p>
            Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen Vorgaben gelöscht,
            sobald deren zur Verarbeitung erlaubten Einwilligungen widerrufen werden oder sonstige
            Erlaubnisse entfallen (z.B., wenn der Zweck der Verarbeitung dieser Daten entfallen ist
            oder sie für den Zweck nicht erforderlich sind).
          </p>
          <p>
            Sofern die Daten nicht gelöscht werden, weil sie für andere und gesetzlich zulässige
            Zwecke erforderlich sind, wird deren Verarbeitung auf diese Zwecke beschränkt. D.h., die
            Daten werden gesperrt und nicht für andere Zwecke verarbeitet. Das gilt z.B. für Daten,
            die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen oder deren
            Speicherung zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum
            Schutz der Rechte einer anderen natürlichen oder juristischen Person erforderlich ist.
          </p>
          <p>
            Weitere Hinweise zu der Löschung von personenbezogenen Daten können ferner im Rahmen der
            einzelnen Datenschutzhinweise dieser Datenschutzerklärung erfolgen.
          </p>

          <h2 id="m15">Änderung und Aktualisierung der Datenschutzerklärung</h2>

          <p>
            Wir bitten Sie, sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu
            informieren. Wir passen die Datenschutzerklärung an, sobald die Änderungen der von uns
            durchgeführten Datenverarbeitungen dies erforderlich machen. Wir informieren Sie, sobald
            durch die Änderungen eine Mitwirkungshandlung Ihrerseits (z.B. Einwilligung) oder eine
            sonstige individuelle Benachrichtigung erforderlich wird.
          </p>
          <p>
            Sofern wir in dieser Datenschutzerklärung Adressen und Kontaktinformationen von
            Unternehmen und Organisationen angeben, bitten wir zu beachten, dass die Adressen sich
            über die Zeit ändern können und bitten die Angaben vor Kontaktaufnahme zu prüfen.
          </p>

          <h2 id="m10">Rechte der betroffenen Personen</h2>

          <p>
            Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die sich insbesondere
            aus Art. 15 bis 21 DSGVO ergeben:
          </p>
          <ul>
            <li>
              <strong>
                Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen
                Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden
                personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt,
                Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes
                Profiling. Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um
                Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die
                Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke derartiger
                Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher
                Direktwerbung in Verbindung steht.
              </strong>
            </li>
            <li>
              <strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte
              Einwilligungen jederzeit zu widerrufen.
            </li>
            <li>
              <strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu
              verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten
              sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen
              Vorgaben.
            </li>
            <li>
              <strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den gesetzlichen
              Vorgaben das Recht, die Vervollständigung der Sie betreffenden Daten oder die
              Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.
            </li>
            <li>
              <strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben nach
              Maßgabe der gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten
              unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben
              eine Einschränkung der Verarbeitung der Daten zu verlangen.
            </li>
            <li>
              <strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende
              Daten, die Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in
              einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder deren
              Übermittlung an einen anderen Verantwortlichen zu fordern.
            </li>
            <li>
              <strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben ferner nach Maßgabe der
              gesetzlichen Vorgaben das Recht, bei einer Aufsichtsbehörde, insbesondere in dem
              Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts
              des mutmaßlichen Verstoßes Beschwerde einzulegen, wenn Sie der Ansicht sind, dass die
              Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.
            </li>
          </ul>

          <h2 id="m42">Begriffsdefinitionen</h2>

          <p>
            In diesem Abschnitt erhalten Sie eine Übersicht über die in dieser Datenschutzerklärung
            verwendeten Begrifflichkeiten. Viele der Begriffe sind dem Gesetz entnommen und vor
            allem im Art. 4 DSGVO definiert. Die gesetzlichen Definitionen sind verbindlich. Die
            nachfolgenden Erläuterungen sollen dagegen vor allem dem Verständnis dienen. Die
            Begriffe sind alphabetisch sortiert.
          </p>
          <ul className="glossary">
            <li>
              <strong>Content Delivery Network (CDN):</strong> Ein &quot;Content Delivery
              Network&quot; (CDN) ist ein Dienst, mit dessen Hilfe Inhalte eines Onlineangebotes,
              insbesondere große Mediendateien, wie Grafiken oder Programm-Skripte mit Hilfe
              regional verteilter und über das Internet verbundener Server, schneller und sicherer
              ausgeliefert werden können.{" "}
            </li>
            <li>
              <strong>Personenbezogene Daten:</strong> &quot;Personenbezogene Daten&quot; sind alle
              Informationen, die sich auf eine identifizierte oder identifizierbare natürliche
              Person (im Folgenden &quot;betroffene Person&quot;) beziehen; als identifizierbar wird
              eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels
              Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu
              einer Online-Kennung (z.B. Cookie) oder zu einem oder mehreren besonderen Merkmalen
              identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen,
              psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen
              Person sind.{" "}
            </li>
            <li>
              <strong>Tracking:</strong> Vom &quot;Tracking&quot; spricht man, wenn das Verhalten
              von Nutzern über mehrere Onlineangebote hinweg nachvollzogen werden kann. Im Regelfall
              werden im Hinblick auf die genutzten Onlineangebote Verhaltens- und
              Interessensinformationen in Cookies oder auf Servern der Anbieter der
              Trackingtechnologien gespeichert (sogenanntes Profiling). Diese Informationen können
              anschließend z.B. eingesetzt werden, um den Nutzern Werbeanzeigen anzuzeigen, die
              voraussichtlich deren Interessen entsprechen.
            </li>
            <li>
              <strong>Verantwortlicher:</strong> Als &quot;Verantwortlicher&quot; wird die
              natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die
              allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
              personenbezogenen Daten entscheidet, bezeichnet.
            </li>
            <li>
              <strong>Verarbeitung:</strong> &quot;Verarbeitung&quot; ist jeder mit oder ohne Hilfe
              automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im
              Zusammenhang mit personenbezogenen Daten. Der Begriff reicht weit und umfasst
              praktisch jeden Umgang mit Daten, sei es das Erheben, das Auswerten, das Speichern,
              das Übermitteln oder das Löschen.
            </li>
          </ul>
          <p className="seal">
            <a
              href="https://datenschutz-generator.de/?l=de"
              title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken."
              target="_blank"
              rel="noreferrer"
            >
              Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas Schwenke
            </a>
          </p>
        </Section>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PrivacyPageProps> = async ({ locale }) => {
  const translations = getTranslations(locale, ["landing"])
  return {
    props: {
      translations,
    },
}
}

export default Privacy
