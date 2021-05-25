import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStockPrice from "app/stock-prices/queries/getStockPrice"
import deleteStockPrice from "app/stock-prices/mutations/deleteStockPrice"

export const StockPrice = () => {
  const router = useRouter()
  const priceId = useParam("priceId", "number")
  const [deleteStockPriceMutation] = useMutation(deleteStockPrice)
  const [price] = useQuery(getStockPrice, { id: priceId })

  return (
    <>
      <Head>
        <title>StockPrice {price.id}</title>
      </Head>

      <div>
        <h1>StockPrice {price.id}</h1>
        <pre>{JSON.stringify(price, null, 2)}</pre>

        <Link href={Routes.EditStockPricePage({ priceId: price.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteStockPriceMutation({ id: price.id })
              router.push(Routes.StockPricesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowStockPricePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.StockPricesPage()}>
          <a>StockPrices</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <StockPrice />
      </Suspense>
    </div>
  )
}

ShowStockPricePage.authenticate = true
ShowStockPricePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowStockPricePage
