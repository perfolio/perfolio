import React, { useEffect, useState } from "react"
import { Card, Modal, Dots, Description } from "@perfolio/ui/components"
import { z } from "zod"
import { Button } from "@perfolio/ui/components"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, Form, handleSubmit } from "@perfolio/ui/form"
import { Exchange } from "@perfolio/api/graphql"

import { useExchanges, useUserSettings, useCreateUserSettings } from "@perfolio/hooks"
import { getCurrency } from "@perfolio/util/currency"
import { useAuth0 } from "@auth0/auth0-react"
/**
 * Check whether a user has settings in the database. If not they are presented
 * a modal to insert settings for the first time
 */
export const OnboardingModal: React.FC = (): JSX.Element | null => {
  const validation = z.object({
    defaultCurrency: z.string(),
    defaultExchange: z.string(),
  })

  const { user } = useAuth0()

  const { exchanges } = useExchanges()

  const { settings, isLoading: userSettingsLoading } = useUserSettings()

  const createUserSettings = useCreateUserSettings()
  const requiresOnboarding = !userSettingsLoading && settings === null
  const [step, setStep] = useState(0)
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onBlur",
    resolver: zodResolver(validation),
  })

  const onSubmit = async (values: z.infer<typeof validation>): Promise<void> => {
    const defaultExchange = exchanges?.find((e: Exchange) => e.name === values.defaultExchange)
    if (!defaultExchange) {
      throw new Error(`No exchange found with name: ${values.defaultExchange}`)
    }
    await createUserSettings.mutateAsync({
      userSettings: {
        userId: user!.sub!,
        defaultCurrency: values.defaultCurrency,
        defaultExchange: defaultExchange.mic,
      },
    })
  }

  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [region, setRegion] = useState<string>("")

  useEffect(() => {
    if (region?.length > 0) {
      ctx.setValue("defaultCurrency", getCurrency(region))
    }
  }, [region, ctx])
  /**
   * Input fields for each step of the form
   */
  const steps: { title: string; description: string; fields: React.ReactNode | null }[] = [
    {
      title: "Welcome",
      description: "Please help us configure perfolio to your preferences. Select a default country and exchange in the next steps.",
      fields: null,
    },
    {
      title: "Step 1: Select your default region",
      description: "Please select the country you usually trade at. In most cases, this is the country where your exchange is located.",
      fields: (
        <Field.Select
          onChange={setRegion}
          options={[...new Set(exchanges?.map((e) => e.region))] ?? []}
          label="Region"
          name="defaultRegion"
        />
      ),
    },
    {
      title: "Step 2: Select your default exchange",
      description:
        "The default exchange you usually trade at. Stock prices are displayed for this exchange.",
      fields: (
        <div className="space-y-4">
          <Field.Select
            options={exchanges?.filter((e) => e.region === region).map((e) => e.name) ?? []}
            label="Exchange"
            name="defaultExchange"
          />
        </div>
      ),
    },
  ]
  if (requiresOnboarding) {
    return (
      <Modal trigger={null}>
        <Form ctx={ctx} formError={formError} className="lg:w-1/3">
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
                    size="sm"
                  >
                    Back
                  </Button>
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
                  size="sm"
                  type="submit"
                  disabled={ctx.formState.isSubmitting}
                >
                  {step < steps.length - 1 ? "Next" : "Save"}
                </Button>
              </Card.Footer.Actions>
            </Card.Footer>
          </Card>
        </Form>
      </Modal>
    )
  }
  return null
}
