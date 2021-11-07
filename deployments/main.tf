

provider "cloudflare" {
  api_token = var.cloudflare.api_token
}

provider "digitalocean" {
  token = var.digitalocean_token
}

module "digitalocean" {
  source = "./digitalocean"
}


provider "vercel" {
  token   = var.vercel_token
}

module "vercel" {
  source = "./vercel"
  team_id = "team_ZYPNERZjT0L9LkPdP0Y9ZtS2"

  database_urls = {
    dev          = module.digitalocean.database_url_dev,
    preview      = module.digitalocean.database_url_preview,
    prod         = module.digitalocean.database_url_prod,
    shadow       = module.digitalocean.database_url_shadow,
    dev_pool     = module.digitalocean.database_url_dev_pool,
    preview_pool = module.digitalocean.database_url_preview_pool,
    prod_pool    = module.digitalocean.database_url_prod_pool,
  }
}

module "cloudflare" {
  source = "./cloudflare"
  config = var.cloudflare
}
