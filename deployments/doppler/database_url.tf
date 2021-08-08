

resource "doppler_secret" "database_url_dev" {
  project = "api-perfolio"
  config  = "dev"
  name    = "DATABASE_URL"
  value   = var.database_urls.dev
}
resource "doppler_secret" "database_url_preview" {
  project = "api-perfolio"
  config  = "preview"
  name    = "DATABASE_URL"
  value   = var.database_urls.preview
}
resource "doppler_secret" "database_url_prod" {
  project = "api-perfolio"
  config  = "prod"
  name    = "DATABASE_URL"
  value   = var.database_urls.prod
}

resource "doppler_secret" "database_url_shadow" {
  project = "api-perfolio"
  config  = "dev"
  name    = "SHADOW_DATABASE_URL"
  value   = var.database_urls.shadow
}


resource "doppler_secret" "database_url_dev_pool" {
  project = "api-perfolio"
  config  = "dev"
  name    = "DATABASE_URL_POOL"
  value   = var.database_urls.dev_pool
}
resource "doppler_secret" "database_url_preview_pool" {
  project = "api-perfolio"
  config  = "preview"
  name    = "DATABASE_URL_POOL"
  value   = var.database_urls.preview_pool
}
resource "doppler_secret" "database_url_prod_pool" {
  project = "api-perfolio"
  config  = "prod"
  name    = "DATABASE_URL_POOL"
  value   = var.database_urls.prod_pool
}
