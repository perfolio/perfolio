import { ResolverFn } from "@perfolio/pkg/api/graphql"
import { Context } from "../../context"

export const subscribeToNewsletter: ResolverFn<string, unknown, Context, { email: string }> =
  async (_parent, { email }, ctx, _info) => {
    await ctx.dataSources.sendgrid.subscribeToNewsletter(email)
    return email
  }
