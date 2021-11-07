import { NextPage, GetStaticProps } from "next"
import { usePortfolios } from "@perfolio/pkg/hooks"
import { AppLayout } from "@perfolio/ui/app"
import { getTranslations, useI18n } from "@perfolio/pkg/i18n"
import { Button, Card, Tooltip, Text } from "@perfolio/ui/components"
import React, { useState } from "react"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import { Field, Form, useForm, handleSubmit } from "@perfolio/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { PencilAltIcon } from "@heroicons/react/outline"
import { InlineTotalAssetChart } from "@perfolio/ui/app"

const PortfolioCard: React.FC<{ id: string; name: string; primary: boolean }> = ({
  id,
  name,
}): JSX.Element => {
  const [editMode, setEditMode] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | React.ReactNode | null>(null)

  const validation = z.object({
    title: z.string().nonempty(),
  })
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onSubmit",
    resolver: zodResolver(validation),
  })

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center h-12">
          {editMode ? (
            <Form
              ctx={ctx}
              formError={formError}
              className="flex flex-col items-start gap-4 mt-4 sm:flex-row"
            >
              <Field.Input name="title" type="text" label="Title" defaultValue={name} />
            </Form>
          ) : (
            <Tooltip
              trigger={
                <button className="cursor-text" onDoubleClick={() => setEditMode(true)}>
                  <Card.Header.Title title={name} />
                </button>
              }
            >
              <Text>Double click the title to edit</Text>
            </Tooltip>
          )}
        </div>
      </Card.Header>
      <Card.Content>
        <InlineTotalAssetChart portfolioId={id} />
      </Card.Content>
      <Card.Footer>
        <Card.Footer.Status>
          <Button href={`/portfolio/${id}`}>Go to portfolio</Button>
        </Card.Footer.Status>
        <Card.Footer.Actions>
          {editMode ? (
            <>
              <Button kind="secondary" type="button" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button
                loading={submitting}
                onClick={() =>
                  handleSubmit<z.infer<typeof validation>>(
                    ctx,
                    async ({ title }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000))
                      console.log({ title })
                      setEditMode(false)
                      //  const res = await fetch("/api/subscribe", {
                      //    headers: {
                      //      "Content-Type": "application/json",
                      //    },
                      //    method: "POST",
                      //    body: JSON.stringify({ email }),
                      //  })
                      //  if (res.status === 200) {
                      //    setDone(true)
                      //  } else {
                      //    setFormError(await res.text())
                      //  }
                    },
                    setSubmitting,
                    setFormError,
                  )
                }
                kind="primary"
                size="md"
                type="submit"
                disabled={submitting}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                kind="secondary"
                type="button"
                onClick={() => setEditMode(true)}
                prefix={<PencilAltIcon />}
              >
                Edit
              </Button>
              <Button kind="alert" shape="square" type="button" onClick={() => alert("Watch out")}>
                Delete
              </Button>
            </>
          )}
        </Card.Footer.Actions>
      </Card.Footer>
    </Card>
  )
}

interface PageProps {
  translations: Record<string, string>
}

const IndexPage: NextPage<PageProps> = ({ translations }) => {
  useI18n(translations)
  const { portfolios } = usePortfolios()
  return (
    <AppLayout side="left">
      <div className="flex flex-col space-y-16">
        <Card>
          <div className="flex flex-col items-center p-8 my-8 space-y-6 text-center">
            <Card.Header>
              <Card.Header.Title title="Your portfolios"></Card.Header.Title>
            </Card.Header>
          </div>
        </Card>
        {[...portfolios.sort((a, b) => Number(a.primary) - Number(b.primary))].map((p) => (
          <PortfolioCard key={p.id} {...p} />
        ))}
      </div>
    </AppLayout>
  )
}

export default withAuthenticationRequired(IndexPage)

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const translations = await getTranslations(locale, ["app"])
  return {
    props: {
      translations,
    },
  }
}
