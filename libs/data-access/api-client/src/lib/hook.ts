import { useContext } from "react"
import { ApiContext } from "./context"
import { Api } from "./api"

export const useApi = (): Api => {
  const { getApi, setApi } = useContext(ApiContext)

  let api = getApi()
  if (!api) {
    api = new Api()
    setApi(api)
  }

  return api
}
