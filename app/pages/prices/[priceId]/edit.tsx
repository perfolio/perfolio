import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPrice from "app/prices/queries/getPrice"
import updatePrice from "app/prices/mutations/updatePrice"
import { PriceForm, FORM_ERROR } from "app/prices/components/PriceForm"

export const EditPrice = () => {
  const router = useRouter()
  const priceId = useParam("priceId", "number")
  const [price, { setQueryData }] = useQuery(getPrice, { id: priceId })
  const [updatePriceMutation] = useMutation(updatePrice)

  return (
    <>
      <Head>
        <title>Edit Price {price.id}</title>
      </Head>

      <div>
        <h1>Edit Price {price.id}</h1>
        <pre>{JSON.stringify(price)}</pre>

        <PriceForm
          submitText="Update Price"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePrice}
          initialValues={price}
          onSubmit={async (values) => {
            try {
              const updated = await updatePriceMutation({
                id: price.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowPricePage({ priceId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditPricePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPrice />
      </Suspense>

      <p>
        <Link href={Routes.PricesPage()}>
          <a>Prices</a>
        </Link>
      </p>
    </div>
  )
}

EditPricePage.authenticate = true
EditPricePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPricePage
