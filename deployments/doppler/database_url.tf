resource "doppler_secret" "database_url_pool_prod" {
  project = "api-perfolio"
  config  = "prod"
  name    = "DATABASE_URL"
  value   = var.database_urls.prod_pool
}
resource "doppler_secret" "database_url_pool_staging" {
  project = "api-perfolio"
  config  = "preview"
  name    = "DATABASE_URL"
  value   = var.database_urls.staging_pool
}
resource "doppler_secret" "database_url_pool_dev" {
  project = "api-perfolio"
  config  = "dev"
  name    = "DATABASE_URL"
  value   = var.database_urls.dev_pool
}
resource "doppler_secret" "database_url_shadow" {
  project = "api-perfolio"
  config  = "dev"
  name    = "SHADOW_DATABASE_URL"
  value   = var.database_urls.shadow
}
resource "doppler_secret" "database_url_direct_prod" {
  project = "api-perfolio"
  config  = "prod"
  name    = "DATABASE_URL_DIRECT"
  value   = var.database_urls.direct
}

resource "doppler_secret" "database_url_direct_staging" {
  project = "api-perfolio"
  config  = "preview"
  name    = "DATABASE_URL_DIRECT"
  value   = var.database_urls.direct
}
