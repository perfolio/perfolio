

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
    direct       = module.digitalocean.database_cluster_uri
    prod_pool    = module.digitalocean.database_url_prod_pool,
    staging_pool = module.digitalocean.database_url_staging_pool,
    dev_pool     = module.digitalocean.database_url_dev_pool,
    shadow  = module.digitalocean.database_url_shadow
  }
}

module "cloudflare" {
  source = "./cloudflare"
  config = var.cloudflare
}