import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPrice from "app/prices/queries/getPrice"
import deletePrice from "app/prices/mutations/deletePrice"

export const Price = () => {
  const router = useRouter()
  const priceId = useParam("priceId", "number")
  const [deletePriceMutation] = useMutation(deletePrice)
  const [price] = useQuery(getPrice, { id: priceId })

  return (
    <>
      <Head>
        <title>Price {price.id}</title>
      </Head>

      <div>
        <h1>Price {price.id}</h1>
        <pre>{JSON.stringify(price, null, 2)}</pre>

        <Link href={Routes.EditPricePage({ priceId: price.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePriceMutation({ id: price.id })
              router.push(Routes.PricesPage())
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

const ShowPricePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PricesPage()}>
          <a>Prices</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Price />
      </Suspense>
    </div>
  )
}

ShowPricePage.authenticate = true
ShowPricePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPricePage
