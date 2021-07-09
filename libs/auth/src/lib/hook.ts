import { useQuery } from "react-query"
import { Session } from "./auth"

export const useSession = () => {
  const { data, ...meta } = useQuery<Session | null, Error>({
    queryKey: "session",
    queryFn: () => fetch("/api/auth/session").then((res) => res.json()),
  })

  return { session: data?.issuer ? data : undefined, ...meta }
}
