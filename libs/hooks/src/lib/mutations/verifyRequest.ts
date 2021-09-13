import { useMutation } from "react-query"

export const useVerifyRequest = () => {
  const { data, ...meta } = useMutation<
    { accessToken: string },
    Error,
    { email: string; otp: string }
  >(async ({ email, otp }) => {
    return await fetch("/api/auth/verification/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    }).then((res) => res.json())
  })
  return { accessToken: data?.accessToken, ...meta }
}
