import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, Form, useForm, handleSubmit } from "@perfolio/ui/form"
import { z } from "zod"
import Link from "next/link"
import { Button, Text } from "@perfolio/ui/components"
/* eslint-disable-next-line */
export interface FooterProps {}

const validation = z.object({
  email: z.string().email(),
})

const socialMedia = () => {
  return (
    <div className="flex items-center justify-end space-x-8">
      <FooterLink href="https://github.com/perfolio">
        <svg
          className="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </FooterLink>
      <FooterLink href="https://twitter/perfolio3">
        <svg
          className="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
        </svg>
      </FooterLink>
    </div>
  )
}

const FooterLink: React.FC<{ href: string }> = ({ href, children }): JSX.Element => {
  return (
    <div>
      <Link href={href}>
        <a className="text-gray-600 transition duration-500 hover:text-black hover:font-medium ">
          {children}
        </a>
      </Link>
    </div>
  )
}

const FooterColumn: React.FC<{ title: string }> = ({ title, children }): JSX.Element => {
  return (
    <div>
      <p className="font-medium tracking-wide text-gray-700">{title}</p>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  )
}

export const Footer = () => {
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onSubmit",
    resolver: zodResolver(validation),
  })
  const [formError, setFormError] = useState<string | React.ReactNode | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  return (
    <footer className="bg-gray-100">
      <div className="container px-4 py-10 mx-auto md:py-12 lg:py-16 xl:py-20 xl:px-0">
        <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
          <div className="grid grid-cols-2 gap-8 lg:col-span-4 md:grid-cols-4">
            <FooterColumn title="Product">
              <FooterLink href="https://app.perfol.io">app.perfol.io</FooterLink>
            </FooterColumn>
            <FooterColumn title="Media">
              <FooterLink href="/">Twitter</FooterLink>
              <FooterLink href="/">Linkedin</FooterLink>
              <FooterLink href="/">Instagram</FooterLink>
              <FooterLink href="/">Github</FooterLink>
            </FooterColumn>
            <FooterColumn title="Legal">
              <FooterLink href="/imprint">Imprint</FooterLink>
              <FooterLink href="/privacy">Privacy</FooterLink>
            </FooterColumn>
            <FooterColumn title="Contact">
              <FooterLink href="mailto:info@perfol.io">info@perfol.io</FooterLink>
            </FooterColumn>
          </div>
          <div className="mt-4 lg:col-span-2 lg:mt-0">
            <p className="text-base font-medium tracking-wide text-center text-gray-700 md:text-left">
              Subscribe for updates
            </p>
            {done ? (
              <Text>Thank you, we&apos;ll get back to you</Text>
            ) : (
              <Form
                ctx={ctx}
                formError={formError}
                className="flex flex-col items-end gap-4 sm:flex-row"
              >
                <Field.Input
                  hideLabel
                  placeholder="email@example.com"
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
                  kind="primary"
                  size="auto"
                  type="submit"
                  disabled={submitting}
                >
                  Subscribe
                </Button>
              </Form>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-300 sm:flex-row">
          <p className="text-sm text-gray-600">
            © Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4sm:mt-0">{socialMedia()}</div>
        </div>
      </div>
    </footer>
  )
}
