import { NextPage, GetStaticProps } from "next"
import { usePortfolios } from "@perfolio/pkg/hooks"
import { AppLayout } from "@perfolio/ui/app"
import { getTranslations, useI18n } from "@perfolio/pkg/i18n"
import { Button, Card, Tooltip, Text, Icon } from "@perfolio/ui/components"
import React, { Fragment, useState } from "react"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import { Field, Form, useForm, handleSubmit } from "@perfolio/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DotsVerticalIcon, PencilAltIcon, TrashIcon, XIcon } from "@heroicons/react/outline"
import { InlineTotalAssetChart } from "@perfolio/ui/app"
import { DeletionModal } from "@perfolio/ui/app/deletionModal"
import { Popover, Transition } from "@headlessui/react"

const PortfolioCard: React.FC<{ id: string; name: string; primary: boolean }> = ({
  id,
  name,
}): JSX.Element => {
  const [editMode, setEditMode] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | React.ReactNode | null>(null)
  const [deletionModalVisible, setDeletionModalVisible] = useState(false)

  const validation = z.object({
    title: z.string().nonempty(),
  })
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onSubmit",
    resolver: zodResolver(validation),
  })

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <Card>
      {deletionModalVisible ? (
        <DeletionModal
          onCancel={() => setDeletionModalVisible(false)}
          onDelete={() => setDeletionModalVisible(false)}
        />
      ) : null}
      <Card.Header>
        <div className="flex items-center h-12 w-full">
          {editMode ? (
            <Form
              ctx={ctx}
              formError={formError}
              className="flex flex-col items-start gap-4 mt-4 sm:flex-row"
            >
              <Field.Input name="title" type="text" label="Title" defaultValue={name} />
            </Form>
          ) : (
            <Tooltip
              trigger={
                <button className="cursor-text" onDoubleClick={() => setEditMode(true)}>
                  <Card.Header.Title title={name} />
                </button>
              }
            >
              <Text>Double click the title to edit</Text>
            </Tooltip>
          )}
        </div>
        <div>
          <div>
            <Popover className="relative">
              {(open) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open.open ? "text-gray-900" : "text-gray-500",
                      "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                    )}
                  >
                    <Icon size="sm" label="DotsMenu">
                      {open.open ? <XIcon /> : <DotsVerticalIcon />}
                    </Icon>
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2  max-w-xs sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Button
                            kind="plain"
                            type="button"
                            onClick={() => {
                              setEditMode(!editMode)
                              open.close()
                              open.open = false
                            }}
                            prefix={<PencilAltIcon />}
                            justify="start"
                          >
                            Edit
                          </Button>
                          <Button
                            kind="plain"
                            type="button"
                            onClick={() => setDeletionModalVisible(true)}
                            prefix={<TrashIcon />}
                            justify="start"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <InlineTotalAssetChart portfolioId={id} />
      </Card.Content>
      <Card.Footer>
        <Card.Footer.Status></Card.Footer.Status>
        <Card.Footer.Actions>
          {editMode ? (
            <>
              <Button kind="secondary" type="button" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button
                loading={submitting}
                onClick={() =>
                  handleSubmit<z.infer<typeof validation>>(
                    ctx,
                    async ({ title }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000))
                      console.log({ title })
                      setEditMode(false)
                      //  const res = await fetch("/api/subscribe", {
                      //    headers: {
                      //      "Content-Type": "application/json",
                      //    },
                      //    method: "POST",
                      //    body: JSON.stringify({ email }),
                      //  })
                      //  if (res.status === 200) {
                      //    setDone(true)
                      //  } else {
                      //    setFormError(await res.text())
                      //  }
                    },
                    setSubmitting,
                    setFormError,
                  )
                }
                kind="primary"
                size="md"
                type="submit"
                disabled={submitting}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Button href={`/portfolio/${id}`}>Go to portfolio</Button>
            </>
          )}
        </Card.Footer.Actions>
      </Card.Footer>
    </Card>
  )
}

interface PageProps {
  translations: Record<string, string>
}

const IndexPage: NextPage<PageProps> = ({ translations }) => {
  useI18n(translations)
  const { portfolios } = usePortfolios()
  return (
    <AppLayout side="left">
      <div className="flex flex-col space-y-16">
        <Card>
          <div className="flex flex-col items-center p-8 my-8 space-y-6 text-center">
            <Card.Header>
              <Card.Header.Title title="Your portfolios"></Card.Header.Title>
            </Card.Header>
          </div>
        </Card>
        {[...portfolios.sort((a, b) => Number(a.primary) - Number(b.primary))].map((p) => (
          <PortfolioCard key={p.id} {...p} />
        ))}
      </div>
    </AppLayout>
  )
}

export default withAuthenticationRequired(IndexPage)

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const translations = await getTranslations(locale, ["app"])
  return {
    props: {
      translations,
    },
  }
}
