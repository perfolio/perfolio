import { Input, AsyncButton } from "app/core/components"
import { useForm } from "react-hook-form"
import React from "react"
interface FormData {
  password: string
  passwordConfirmation: string
}

type ResetPasswordFormProps = {
  onSubmit: (values: FormData) => void
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit }): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" })

  const password = watch("password")
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 grid-col-1">
      <Input
        type="password"
        label="New Password"
        register={register("password", {
          required: "Please enter your password",
          minLength: {
            value: 8,
            message: "Must be at least 8 characters long",
          },
        })}
        error={errors.password?.message}
      />
      <Input
        type="password"
        label="Confirm password"
        register={register("passwordConfirmation", {
          required: "Please confirm your password",
          validate: (confirmPassword) => confirmPassword === password || "Passwords must match",
        })}
        error={errors.passwordConfirmation?.message}
      />

      <AsyncButton
        size="auto"
        type="primary"
        label="Reset password"
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  )
}
