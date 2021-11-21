import { withAuthenticationRequired } from "@auth0/auth0-react"
import { getTranslations, useI18n } from "@perfolio/pkg/i18n"
import { GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"

interface PageProps {
  translations: Record<string, string>
}

const Page: NextPage<PageProps> = ({ translations }) => {
  const { t } = useI18n(translations)
  const router = useRouter()

  return (
    <div>
      {t("paymentSuccess")}
      <br></br>
      {router.query["session_id"]}
    </div>
  )
}

export default withAuthenticationRequired(Page)

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const translations = await getTranslations(locale, ["app"])
  return {
    props: {
      translations,
    },
  }
}
