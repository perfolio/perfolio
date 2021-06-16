


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




module "cloudflare" {
  source = "./cloudflare"
  config = var.cloudflare
}