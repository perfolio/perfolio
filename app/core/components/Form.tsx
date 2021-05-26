import { useState, ReactNode, PropsWithoutRef } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ExclamationCircleIcon } from "@heroicons/react/outline"
import { AsyncButton } from "app/core/components"
export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const ctx = useForm<z.infer<S>>({
    mode: "onBlur",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })
  const [formError, setFormError] = useState<string | null>(null)

  return (
    <FormProvider {...ctx}>
      <form className="w-full space-y-4 form" {...props}>
        {/* Form fields supplied as children are rendered here */}
        {children}

        {formError ? (
          <div
            role="alert"
            className="flex items-center pt-2 pb-4 space-x-1 text-sm text-error-500"
          >
            <ExclamationCircleIcon className="w-4 h-4" />
            <p>
              <span className="font-semibold">Error:</span> {formError}
            </p>
          </div>
        ) : null}
        <div className="w-full">
          <AsyncButton
            onClick={ctx.handleSubmit(async (values) => {
              const result = (await onSubmit(values)) || {}
              for (const [key, value] of Object.entries(result)) {
                if (key === FORM_ERROR) {
                  setFormError(value)
                } else {
                  ctx.setError(key as any, {
                    type: "submit",
                    message: value,
                  })
                }
              }
            })}
            kind="primary"
            size="auto"
            label={submitText}
            type="submit"
            disabled={ctx.formState.isSubmitting}
          />
        </div>
      </form>
    </FormProvider>
  )
}

export default Form
