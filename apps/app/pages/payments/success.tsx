import { NextPage } from "next"
import { useRouter } from "next/router"
import { useI18n } from "@perfolio/feature/i18n"

const Page: NextPage = () => {
  const { t } = useI18n()
  const router = useRouter()

  return (
    <div>
      {t("paymentSuccess")}<br></br>
      {router.query.session_id}
    </div>
  )
}

export default Page
