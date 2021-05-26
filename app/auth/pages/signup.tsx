import { useRouter, BlitzPage, Routes } from "blitz"
import { SignupForm } from "app/auth/components/SignupForm"
import { AuthPageTemplate } from "app/auth/components/template"
const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <AuthPageTemplate h1="Sign up" h2="Start tracking your investments!">
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </AuthPageTemplate>
  )
}

SignupPage.redirectAuthenticatedTo = "/"

export default SignupPage
