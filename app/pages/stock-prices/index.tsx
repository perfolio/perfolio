import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStockPrices from "app/stock-prices/queries/getStockPrices"

const ITEMS_PER_PAGE = 100

export const StockPricesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ prices, hasMore }] = usePaginatedQuery(getStockPrices, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {prices.map((price) => (
          <li key={price.id}>
            <Link href={Routes.ShowStockPricePage({ priceId: price.id })}>
              <a>{price.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const StockPricesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>StockPrices</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewStockPricePage()}>
            <a>Create StockPrice</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <StockPricesList />
        </Suspense>
      </div>
    </>
  )
}

StockPricesPage.authenticate = true
StockPricesPage.getLayout = (page) => <Layout>{page}</Layout>

export default StockPricesPage
