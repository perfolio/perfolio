import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SigninForm } from "app/auth/components/SigninForm"

const SigninPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SigninForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SigninPage.redirectAuthenticatedTo = "/"
SigninPage.getLayout = (page) => <Layout title="Sign In">{page}</Layout>

export default SigninPage
