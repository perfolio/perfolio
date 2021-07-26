import { ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"

export const subscribeToNewsletter: ResolverFn<string, unknown, Context, { email: string }> =
  async (_parent, { email }, ctx, { cacheControl }) => {
    cacheControl.setCacheHint({ maxAge: 0 })
    await ctx.dataSources.sendgrid.subscribeToNewsletter(email)
    return email
  }
