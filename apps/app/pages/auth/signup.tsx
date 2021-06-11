import { NextPage } from "next"
import { SignupForm, AuthPageTemplate } from "@perfolio/auth"
import { useRouter } from "next/router"
const SignupPage: NextPage = () => {
  const router = useRouter()

  return (
    <AuthPageTemplate h1="Sign up" h2="Start tracking your investments!">
      <SignupForm onSuccess={() => router.push("/app")} />
    </AuthPageTemplate>
  )
}

export default SignupPage
