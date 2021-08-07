
resource "doppler_secret" "database_url_prod" {
  project = "api-perfolio"
  config  = "prod"
  name    = "DATABASE_URL"
  value   = "${var.database_urls.prod}&pgbouncer=true"
}
resource "doppler_secret" "database_url_staging" {
  project = "api-perfolio"
  config  = "preview"
  name    = "DATABASE_URL"
  value   = "${var.database_urls.staging}&pgbouncer=true"
}
resource "doppler_secret" "database_url_dev" {
  project = "api-perfolio"
  config  = "dev"
  name    = "DATABASE_URL"
  value   = "${var.database_urls.dev}&pgbouncer=true"
}
resource "doppler_secret" "database_url_shadow" {
  project = "api-perfolio"
  config  = "dev"
  name    = "SHADOW_DATABASE_URL"
  value   = "${var.database_urls.shadow}&pgbouncer=true"
}
