import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getSession } from "./auth"

export type ServerSideAuthenticationConfig = {
  redirect: {
    authenticated?: string
    anonymous?: string
  }
}

export function serverSideAuthentication(
  config?: ServerSideAuthenticationConfig,
): GetServerSideProps {
  return async function (ctx: GetServerSidePropsContext) {
    const session = await getSession(ctx.req)

    let destination
    if (session) {
      destination = config?.redirect.authenticated
    } else {
      destination = config?.redirect.anonymous ?? "/auth/signin"
    }

    return {
      props: {},
      redirect: destination
        ? {
            destination,
            permanent: false,
          }
        : undefined,
    }
  }
}
