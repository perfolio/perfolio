import { NextPage, GetStaticProps } from "next"
import { usePortfolios } from "@perfolio/pkg/hooks"
import { AppLayout } from "@perfolio/ui/app"
import { getTranslations, useI18n } from "@perfolio/pkg/i18n"
import { Button, Card, Text } from "@perfolio/ui/components"
import React, { useState } from "react"
import { withAuthenticationRequired } from "@auth0/auth0-react"

const PortfolioCard: React.FC<{ id: string; name: string; primary: boolean }> = ({
  id,
  name,
}): JSX.Element => {
  const [editable, setEditable] = useState(false)
  const [title, setTitle] = useState(name)
  const [description, setDescription] = useState("You can place any description here")

  const onSubmit = (
    title: React.SetStateAction<string>,
    description: React.SetStateAction<string>,
  ) => {
    setTitle(title)
    setDescription(description)
    setEditable(false)
  }

  return (
    <Card>
      <div className="relative flex flex-col lg:flex-row">
        <div className="w-full">
          <Card.Header>
            <Card.Header.Title title={title} contentEditable={editable} />
          </Card.Header>
          <Card.Footer>
            <Card.Footer.Status>
              <Text contentEditable={editable}>{description}</Text>
            </Card.Footer.Status>
            <Card.Footer.Actions>
              {editable ? (
                <Button kind="primary" onClick={() => onSubmit(title, description)}>
                  Save
                </Button>
              ) : null}
              {!editable ? (
                <Button kind="cta" onClick={() => setEditable(true)}>
                  Edit
                </Button>
              ) : null}
              {!editable ? (
                <Button kind="alert" onClick={() => alert("test")}>
                  Delete
                </Button>
              ) : null}
              {!editable ? <Button href={`/portfolio/${id}`}>Go to portfolio</Button> : null}
            </Card.Footer.Actions>
          </Card.Footer>
        </div>
      </div>
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
