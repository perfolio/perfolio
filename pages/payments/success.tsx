import { NextPage, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useI18n, getTranslations } from "@perfolio/pkg/i18n"
import { withAuthenticationRequired } from "@auth0/auth0-react"

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
