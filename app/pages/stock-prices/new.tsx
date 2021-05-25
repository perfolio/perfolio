import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createStockPrice from "app/stock-prices/mutations/createStockPrice"
import { StockPriceForm, FORM_ERROR } from "app/stock-prices/components/StockPriceForm"

const NewStockPricePage: BlitzPage = () => {
  const router = useRouter()
  const [createStockPriceMutation] = useMutation(createStockPrice)

  return (
    <div>
      <h1>Create New StockPrice</h1>

      <StockPriceForm
        submitText="Create StockPrice"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateStockPrice}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const price = await createStockPriceMutation(values)
            router.push(`/prices/${price.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.StockPricesPage()}>
          <a>StockPrices</a>
        </Link>
      </p>
    </div>
  )
}

NewStockPricePage.authenticate = true
NewStockPricePage.getLayout = (page) => <Layout title={"Create New StockPrice"}>{page}</Layout>

export default NewStockPricePage
