import { useMutation } from "react-query"

export const useCreateVerificationRequest = () => {
  return useMutation<unknown, Error, { email: string }>(async ({ email }) => {
    const res = await fetch("/api/auth/verification/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
    if (!res.ok) {
      throw new Error(await res.text())
    }
  })
}
