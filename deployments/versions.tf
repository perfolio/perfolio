terraform {
  required_providers {
    checkly = {
      source  = "checkly/checkly"
      version = "1.1.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "2.21.0"
    }
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.10.1"
    }
    doppler = {
      source  = "DopplerHQ/doppler"
      version = "1.0.0"
    }
  }

}