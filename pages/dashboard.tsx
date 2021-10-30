import { NextPage, GetStaticProps } from "next"
import { usePortfolios } from "@perfolio/pkg/hooks"
import { AppLayout } from "@perfolio/ui/app"
import { getTranslations, useI18n } from "@perfolio/pkg/i18n"
import { Button, Card } from "@perfolio/ui/components"
import React from "react"
import { withAuthenticationRequired } from "@auth0/auth0-react"

const PortfolioCard: React.FC<{ id: string; name: string; primary: boolean }> = ({
  id,
  name,
}): JSX.Element => {
  return (
    <Card>
      <div className="relative flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 2xl:w-3/4">
          <Card.Header>
            <Card.Header.Title title={name} />
          </Card.Header>
          <Card.Footer>
            <Card.Footer.Actions>
              <Button href={`/portfolio/${id}`}>Go to portfolio</Button>
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
