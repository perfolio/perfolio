import { Client } from "faunadb"
import { authenticatedClient } from "./client"




export class Fauna {
  private readonly client: Client

  constructor(token?: string){
    token = token ?? process.env.FAUNA_SERVER_KEY

    if (!token || token === "") {
      throw new Error(`FAUNA_SERVER_KEY must be defined`)
    }
    this.client = authenticatedClient(token)

  }


  



}
