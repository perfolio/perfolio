import { zodResolver } from "@hookform/resolvers/zod"
import { Button, ButtonType } from "@perfolio/ui/components"
import { Card } from "@perfolio/ui/components"
import { Form, handleSubmit } from "@perfolio/ui/form"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useI18n } from "next-localization"

interface SettingCardProps {
  validation: z.AnyZodObject
  title: string
  footer: string
  onSubmit: (values: Record<string, string | number>) => Promise<void>
  button?: {
    label?: string
    type?: ButtonType
  }
}

export const SettingCard: React.FC<SettingCardProps> = ({
  validation,
  title,
  footer,
  children,
  onSubmit,
  button,
}): JSX.Element => {
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onBlur",
    resolver: zodResolver(validation),
  })
  const { t } = useI18n()
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  return (
    <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
      <Card border={false}>
        <Card.Header>
          <Card.Header.Title title={title} />
        </Card.Header>
        <Card.Content>
          <Form ctx={ctx} formError={formError}>
            {children}
          </Form>
        </Card.Content>
        <Card.Footer>
          <div className="hidden justify-between sm:flex sm:w-full">
            <Card.Footer.Status>{footer}</Card.Footer.Status>
            <Card.Footer.Actions>
              <Button
                loading={submitting}
                // eslint-disable-next-line
                // @ts-ignore
                onClick={() =>
                  handleSubmit<z.infer<typeof validation>>(
                    ctx,
                    onSubmit,
                    setSubmitting,
                    setFormError,
                  )
                }
                type={button?.type ?? "primary"}
                htmlType="submit"
                disabled={ctx.formState.isSubmitting}
              >
                {button?.label ?? t("app.setButtonLabelSave")}
              </Button>
            </Card.Footer.Actions>
          </div>
          <div className="block w-full sm:hidden space-y-2">
            <Card.Footer.Status>{footer}</Card.Footer.Status>
            <Card.Footer.Actions>
              <Button
                size="block"
                loading={submitting}
                // eslint-disable-next-line
                // @ts-ignore
                onClick={() =>
                  handleSubmit<z.infer<typeof validation>>(
                    ctx,
                    onSubmit,
                    setSubmitting,
                    setFormError,
                  )
                }
                type={button?.type ?? "primary"}
                htmlType="submit"
                disabled={ctx.formState.isSubmitting}
              >
                {button?.label ?? t("app.setButtonLabelSave")}
              </Button>
            </Card.Footer.Actions>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}
