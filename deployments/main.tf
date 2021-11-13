

provider "cloudflare" {
  api_token = var.cloudflare.api_token
}

provider "vercel" {
  token = var.vercel_token
}

module "cloudflare" {
  source = "./cloudflare"
  config = var.cloudflare
}
