import { Client } from "faunadb"
/**
 * Create a new client instance with the given secret.
 *
 * @param secret - A fauna secret. Can be either a server secret or user token.
 * You can get them here `https://dashboard.fauna.com/keys/`.
 *
 */
export function authenticatedClient(secret: string): Client {
  return new Client({ secret })
}

/**
 *
 * Load a secret from environment `FAUNA_SERVER_SECRET` and create a new
 * client instance.
 *
 * @throws
 */
export function serverClient(): Client {
  const token = getFaunaServerSecret()
  return authenticatedClient(token)
}

/**
 * Load a secret from environment `FAUNA_SERVER_SECRET`.
 *
 * @throws If not found.
 */
export function getFaunaServerSecret(): string {
  const secret = process.env["FAUNA_SERVER_SECRET"]
  if (!secret || secret === "") {
    throw new Error(
      "Unable to create fauna client: `FAUNA_SERVER_SECRET` was empty",
    )
  }
  return secret
}
