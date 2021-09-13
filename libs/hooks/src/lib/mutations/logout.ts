import { useMutation } from "react-query"
import { useAuth } from "@perfolio/auth"
import { useRouter } from "next/router"
export const useLogout = () => {
  const { clearToken } = useAuth()
  const router = useRouter()
  return useMutation(async () => await fetch("/api/auth/sign-out"), {
    onSuccess: () => {
      router.push("/auth/sign-in")
      clearToken()
    },
  })
}