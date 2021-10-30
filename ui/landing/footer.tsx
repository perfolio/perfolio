import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, Form, useForm, handleSubmit } from "@perfolio/ui/form"
import { z } from "zod"
import Link from "next/link"
import { Button, Text } from "@perfolio/ui/components"
import { useI18n } from "@perfolio/pkg/i18n"
/* eslint-disable-next-line */
export interface FooterProps {}

const validation = z.object({
  email: z.string().email(),
})

const socialMedia = () => {
  return (
    <div className="flex items-center justify-end space-x-8">
      <FooterLink href="https://twitter/perfol_io">
        <svg
          className="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
        </svg>
      </FooterLink>
      <FooterLink href="https://www.linkedin.com/company/perfolio">
        <svg
          className="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </FooterLink>
      <FooterLink href="https://instagram.com/perfol.io">
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z" />
        </svg>
      </FooterLink>
      <FooterLink href="https://github.com/perfolio">
        <svg
          className="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </FooterLink>
    </div>
  )
}

const FooterLink: React.FC<{ href: string }> = ({ href, children }): JSX.Element => {
  return (
    <div>
      <Link href={href}>
        <a
          className="text-gray-400 transition duration-500 hover:text-gray-100 hover:font-medium whitespace-nowrap"
          target="_string"
        >
          {children}
        </a>
      </Link>
    </div>
  )
}

const FooterColumn: React.FC<{ title: string }> = ({ title, children }): JSX.Element => {
  return (
    <div className="flex items-start justify-between p-4 space-x-10 md:space-x-0 md:block">
      <p className="w-1/2 font-medium tracking-wide text-gray-200">{title}</p>
      <div className="w-1/2 space-y-2 md:mt-2">{children}</div>
    </div>
  )
}

export const Footer = () => {
  const { t } = useI18n()
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onSubmit",
    resolver: zodResolver(validation),
  })
  const [formError, setFormError] = useState<string | React.ReactNode | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  return (
    <footer className="bg-black">
      <div className="container px-4 py-10 mx-auto md:py-12 lg:py-16 xl:py-20 xl:px-0">
        <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
          <div className="grid grid-cols-1 gap-8 lg:col-span-4 md:grid-cols-4">
            <FooterColumn title={t("footerColumnProduct")}>
              <FooterLink href="https://perfol.io/dashboard">Portfolio Analytics</FooterLink>
            </FooterColumn>
            <div className="hidden md:block">
              <FooterColumn title={t("footerColumnMedia")}>
                <FooterLink href="https://twitter.com/perfol_io">Twitter</FooterLink>
                <FooterLink href="https://www.linkedin.com/company/perfolio">Linkedin</FooterLink>
                <FooterLink href="https://instagram.com/perfol.io">Instagram</FooterLink>
                <FooterLink href="https://github.com/perfolio">Github</FooterLink>
              </FooterColumn>
            </div>

            <FooterColumn title={t("footerColumnLegal")}>
              <FooterLink href="/imprint">{t("imprintFooter")}</FooterLink>
              <FooterLink href="/privacy">{t("privacyFooter")}</FooterLink>
            </FooterColumn>
            <FooterColumn title={t("footerColumnContact")}>
              <FooterLink href="mailto:info@perfol.io">info@perfol.io</FooterLink>
            </FooterColumn>
          </div>
          <div className="mt-16 lg:col-span-2 lg:mt-0">
            <p className="text-base font-medium tracking-wide text-center text-gray-200 md:text-left">
              {t("footerSubs")}
            </p>
            {done ? (
              <Text align="text-center md:text-left" color="text-gray-300">
                {t("footerSubsDone")}
              </Text>
            ) : (
              <Form
                ctx={ctx}
                formError={formError}
                className="flex flex-col items-end gap-4 mt-4 sm:flex-row"
              >
                <Field.Input
                  hideLabel
                  placeholder={t("footerSubsPlaceMail")}
                  name="email"
                  type="email"
                  label="email"
                />

                <Button
                  loading={submitting}
                  onClick={() =>
                    handleSubmit<z.infer<typeof validation>>(
                      ctx,
                      async ({ email }) => {
                        const res = await fetch("/api/subscribe", {
                          headers: {
                            "Content-Type": "application/json",
                          },
                          method: "POST",
                          body: JSON.stringify({ email }),
                        })
                        if (res.status === 200) {
                          setDone(true)
                        } else {
                          setFormError(res.body)
                        }
                      },
                      setSubmitting,
                      setFormError,
                    )
                  }
                  kind="cta"
                  size="auto"
                  type="submit"
                  disabled={submitting}
                >
                  {t("footerSubsButton")}
                </Button>
              </Form>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-300 sm:flex-row">
          <p className="text-sm text-center text-gray-300">
            © Copyright {new Date().getFullYear()}. {t("allRightsReserved")}
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4 text-gray-300 sm:mt-0">
            {socialMedia()}
          </div>
        </div>
      </div>
    </footer>
  )
}
