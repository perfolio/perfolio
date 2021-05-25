import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStockPrice from "app/stock-prices/queries/getStockPrice"
import updateStockPrice from "app/stock-prices/mutations/updateStockPrice"
import { StockPriceForm, FORM_ERROR } from "app/stock-prices/components/StockPriceForm"

export const EditStockPrice = () => {
  const router = useRouter()
  const priceId = useParam("priceId", "number")
  const [price, { setQueryData }] = useQuery(getStockPrice, { id: priceId })
  const [updateStockPriceMutation] = useMutation(updateStockPrice)

  return (
    <>
      <Head>
        <title>Edit StockPrice {price.id}</title>
      </Head>

      <div>
        <h1>Edit StockPrice {price.id}</h1>
        <pre>{JSON.stringify(price)}</pre>

        <StockPriceForm
          submitText="Update StockPrice"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateStockPrice}
          initialValues={price}
          onSubmit={async (values) => {
            try {
              const updated = await updateStockPriceMutation({
                id: price.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowStockPricePage({ priceId: updated.id }))
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

const EditStockPricePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditStockPrice />
      </Suspense>

      <p>
        <Link href={Routes.StockPricesPage()}>
          <a>StockPrices</a>
        </Link>
      </p>
    </div>
  )
}

EditStockPricePage.authenticate = true
EditStockPricePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditStockPricePage
