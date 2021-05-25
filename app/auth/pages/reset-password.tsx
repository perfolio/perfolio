import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from "blitz"
import { FORM_ERROR } from "app/core/components/Form"
import { ResetPasswordForm } from "app/auth/components/ResetPasswordForm"
import resetPassword from "app/auth/mutations/resetPassword"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <section className="bg-white ">
      <div className="h-screen mx-auto max-w-7xl">
        <div className="flex flex-col h-full lg:flex-row">
          <div className="relative w-full h-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100">
            <div className="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
              <div className="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                <div className="relative">
                  <h2 className="text-5xl font-bold text-gray-900 xl:text-6xl">
                    Set a new password{" "}
                  </h2>
                </div>
                <p className="text-2xl font-normal text-gray-500">Sign in</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-1/2 space-y-16 bg-white">
            {isSuccess ? (
              <div>
                <h2>Password Reset Successfully</h2>
                <p>
                  Go to the <Link href={Routes.Home()}>homepage</Link>
                </p>
              </div>
            ) : (
              <ResetPasswordForm
                onSubmit={async (values) => {
                  try {
                    await resetPasswordMutation({
                      password: values.password,
                      passwordConfirmation: String(values.passwordConfirmation),
                      token: query.token as string,
                    })
                  } catch (error) {
                    if (error.name === "ResetPasswordError") {
                      return {
                        [FORM_ERROR]: error.message,
                      }
                    } else {
                      return {
                        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                      }
                    }
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
