import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createPrice from "app/prices/mutations/createPrice"
import { PriceForm, FORM_ERROR } from "app/prices/components/PriceForm"

const NewPricePage: BlitzPage = () => {
  const router = useRouter()
  const [createPriceMutation] = useMutation(createPrice)

  return (
    <div>
      <h1>Create New Price</h1>

      <PriceForm
        submitText="Create Price"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePrice}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const price = await createPriceMutation(values)
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
        <Link href={Routes.PricesPage()}>
          <a>Prices</a>
        </Link>
      </p>
    </div>
  )
}

NewPricePage.authenticate = true
NewPricePage.getLayout = (page) => <Layout title={"Create New Price"}>{page}</Layout>

export default NewPricePage
