

provider "checkly" {
  api_key = var.checkly_api_key
}

module "checkly" {
  source          = "./checkly"
  checkly_api_key = var.checkly_api_key
}



provider "cloudflare" {
  api_token = var.cloudflare.api_token
}

provider "digitalocean" {
  token = var.digitalocean_token
}

module "digitalocean" {
  source = "./digitalocean"
}


provider "doppler" {
  doppler_token = var.doppler_token
}

module "doppler" {
  source = "./doppler"
  database_urls = {
    prod    = module.digitalocean.database_url_prod,
    staging = module.digitalocean.database_url_staging,
    dev     = module.digitalocean.database_url_dev,
  }
}

module "cloudflare" {
  source = "./cloudflare"
  config = var.cloudflare
}