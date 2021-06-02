terraform {
  backend "remote" {
    organization = "perfolio"
    workspaces {
      name = "app"
    }
  }
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.5.1"
    }
  }

}
