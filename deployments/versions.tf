terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "2.21.0"
    }
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.10.1"
    }
    vercel = {
      source  = "chronark/vercel"
      version = "0.14.2"
    }
  }

}