import React from "react"
import { FormProvider, UseFormReturn } from "react-hook-form"
import { ExclamationCircleIcon } from "@heroicons/react/outline"

export interface FormProps<FieldValues> {
  ctx: UseFormReturn<FieldValues>
  formError: string | null
  children: React.ReactNode
  className?: string
}

export function Form<FieldValues>({
  ctx,
  formError,
  children,
  className,
}: FormProps<FieldValues>): JSX.Element {
  return (
    <FormProvider {...ctx}>
      <form className={className}>{children}</form>
      {formError ? (
        <div role="alert" className="flex items-center gap-1 pt-2 pb-4 text-sm text-error-500">
          <ExclamationCircleIcon className="w-4 h-4" />
          <p>
            <span className="font-semibold">Error:</span> {formError}
          </p>
        </div>
      ) : null}
    </FormProvider>
  )
}

export async function handleSubmit<FieldValues>(
  ctx: UseFormReturn<FieldValues>,
  onSubmit: (values: FieldValues) => Promise<void>,
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  setFormError: React.Dispatch<React.SetStateAction<string | null>>,
): Promise<void> {
  const values = ctx.getValues()
  await ctx.handleSubmit(async () => {
    setSubmitting(true)
    await onSubmit(values as FieldValues)
      .catch((err) => {
        setFormError(err.message ?? null)
      })
      .finally(() => setSubmitting(false))
  })()
}
