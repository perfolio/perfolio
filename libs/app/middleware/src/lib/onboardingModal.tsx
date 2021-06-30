import React, { useState } from "react"
import { Card, Modal, Dots, Description } from "@perfolio/ui/design-system"
import { z } from "zod"
import { Button } from "@perfolio/ui/components"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, Form, handleSubmit } from "@perfolio/ui/form"
import { Exchange } from "@perfolio/types"
import { useSettings, useExchanges } from "@perfolio/data-access/queries"
import { useSession } from "next-auth/client"
import { useCreateSettings } from "@perfolio/data-access/mutations"
/**
 * Check whether a user has settings in the database. If not they are presented
 * a modal to insert settings for the first time
 */
export const OnboardingModal: React.FC = (): JSX.Element | null => {
  const validation = z.object({
    defaultCurrency: z.string(),
    defaultExchange: z.string(),
  })

  const { exchanges } = useExchanges()

  const { settings, isLoading } = useSettings()
  const createSettings = useCreateSettings()
  const [session, sessionLoading] = useSession()
  const requiresOnboarding =
    !!session && !sessionLoading && !isLoading && (!settings || Object.keys(settings).length === 0)

  const [step, setStep] = useState(0)
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onBlur",
    resolver: zodResolver(validation),
  })

  const onSubmit = async (values: z.infer<typeof validation>): Promise<void> => {
    const defaultExchange = exchanges?.find(
      (e: Exchange) => e.description === values.defaultExchange,
    )?.mic
    if (!defaultExchange) {
      throw new Error(`No exchange found with name: ${values.defaultExchange}`)
    }
    await createSettings.mutateAsync({
      defaultCurrency: values.defaultCurrency,
      defaultExchange,
    })
  }

  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [region, setRegion] = useState<string>("")
  if (!requiresOnboarding) {
    return null
  }

  /**
   * Input fields for each step of the form
   */
  const steps: { title: string; description: string; fields: React.ReactNode | null }[] = [
    {
      title: "Welcome",
      description: "Please help us configure perfolio to your preferences.",
      fields: null,
    },
    {
      title: "Step 1: Select your default currency",
      description: "We will display this currency everywhere",
      fields: <Field.Input label="Currency" name="defaultCurrency" type="text" />,
    },
    {
      title: "Step 2: Select your default exchange",
      description:
        "Where do you usually sell your stock? Stock prices are displayed for this exchange.",
      fields: (
        <div className="space-y-4">
          <Field.Select
            onChange={setRegion}
            options={[...new Set(exchanges?.map((e) => e.region))] ?? []}
            label="Region"
            name="defaultRegion"
          />
          <Field.Select
            options={exchanges?.filter((e) => e.region === region).map((e) => e.description) ?? []}
            label="Exchange"
            name="defaultExchange"
          />
        </div>
      ),
    },
  ]
  return (
    <Modal trigger={null}>
      <Form ctx={ctx} formError={formError}>
        <Card>
          <Card.Header>
            <Card.Header.Title title="Welcome to Perfolio" />
          </Card.Header>
          <Card.Content>
            <Description title={steps[step].title}>{steps[step].description}</Description>
            <div className="min-w-full mt-8">{steps[step].fields}</div>
          </Card.Content>
          <Card.Footer>
            {step > 0 ? (
              <Card.Footer.Actions>
                <Button
                  onClick={() => setStep(step > 0 ? step - 1 : 0)}
                  kind="secondary"
                  size="small"
                  label="Back"
                />
              </Card.Footer.Actions>
            ) : null}
            <Card.Footer.Status>
              <Dots current={step} max={steps.length} />
            </Card.Footer.Status>
            <Card.Footer.Actions>
              <Button
                loading={submitting}
                // eslint-disable-next-line
                // @ts-ignore
                onClick={() => {
                  if (step === steps.length - 1) {
                    handleSubmit<z.infer<typeof validation>>(
                      ctx,
                      onSubmit,
                      setSubmitting,
                      setFormError,
                    )
                  } else {
                    setStep(step + 1)
                  }
                }}
                kind={"primary"}
                size="small"
                label={step < steps.length - 1 ? "Next" : "Save"}
                type="submit"
                disabled={ctx.formState.isSubmitting}
              />
            </Card.Footer.Actions>
          </Card.Footer>
        </Card>
      </Form>
    </Modal>
  )
}
