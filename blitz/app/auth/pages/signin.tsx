import { useRouter, BlitzPage, Routes } from "blitz"
import { SigninForm } from "app/auth/components/SigninForm"
import { AuthPageTemplate } from "../components/template"
const SigninPage: BlitzPage = () => {
  const router = useRouter()
  return (
    <AuthPageTemplate h1="Signin" h2="Kevin ist ein frischer Hecht!">
      <SigninForm
        onSuccess={() => {
          const next = router.query.next
            ? decodeURIComponent(router.query.next as string)
            : "/app"
          router.push(next)
        }}
      />
    </AuthPageTemplate>
  )
}

SigninPage.redirectAuthenticatedTo = Routes.Home()

export default SigninPage
