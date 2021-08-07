
resource "doppler_secret" "database_url_prod" {
  project = "api-perfolio"
  config  = "prod"
  name    = "DATABASE_URL"
  value   = "${var.database_urls.prod}?bgbouncer=true"
}
resource "doppler_secret" "database_url_staging" {
  project = "api-perfolio"
  config  = "staging"
  name    = "DATABASE_URL"
  value   = "${var.database_urls.staging}?bgbouncer=true"
}
resource "doppler_secret" "database_url_dev" {
  project = "api-perfolio"
  config  = "dev"
  name    = "DATABASE_URL"
  value   = "${var.database_urls.dev}?bgbouncer=true"
}
