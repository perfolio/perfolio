import { NextPage } from "next"
import { SigninForm, AuthPageTemplate } from "@perfolio/auth"
import { useRouter } from "next/router"
const SigninPage: NextPage = () => {
  const router = useRouter()
  return (
    <AuthPageTemplate h1="Signin" h2="Kevin ist ein frischer Hecht!">
      <SigninForm
        onSuccess={() => {
          router.push("/app")
        }}
      />
    </AuthPageTemplate>
  )
}

export default SigninPage
