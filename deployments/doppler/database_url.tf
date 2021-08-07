resource "doppler_secret" "database_url_prod_pool" {
  project = "api-perfolio"
  config  = "prod"
  name    = "DATABASE_URL"
  value   = "${var.database_urls.prod_pool}&pgbouncer=true"
}
resource "doppler_secret" "database_url_staging_pool" {
  project = "api-perfolio"
  config  = "preview"
  name    = "DATABASE_URL"
  value   = "${var.database_urls.staging_pool}&pgbouncer=true"
}
resource "doppler_secret" "database_url_dev_pool" {
  project = "api-perfolio"
  config  = "dev"
  name    = "DATABASE_URL"
  value   = "${var.database_urls.dev_pool}&pgbouncer=true"
}
resource "doppler_secret" "database_url_shadow" {
  project = "api-perfolio"
  config  = "dev"
  name    = "SHADOW_DATABASE_URL"
  value   = var.database_urls.shadow
}
resource "doppler_secret" "database_url_prod" {
  project = "api-perfolio"
  config  = "prod"
  name    = "DATABASE_URL_DIRECT"
  value   = var.database_urls.direct
}
resource "doppler_secret" "database_url_staging" {
  project = "api-perfolio"
  config  = "preview"
  name    = "DATABASE_URL_DIRECT"
  value   = var.database_urls.direct
}