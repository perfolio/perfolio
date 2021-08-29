import { NextPage } from "next"
import { useRouter } from "next/router"

const Page: NextPage = () => {
  const router = useRouter()

  return (
    <div>
      Success!<br></br>
      {router.query.session_id}
    </div>
  )
}

export default Page
