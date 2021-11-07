

resource "vercel_env" "database_url_dev" {
  project_id = vercel_project.perfolio.id
  target     = ["development"]
  key        = "DATABASE_URL"
  value      = var.database_urls.dev
}
resource "vercel_env" "database_url_preview" {
  project_id = vercel_project.perfolio.id
  target     = ["preview"]
  key        = "DATABASE_URL"
  value      = var.database_urls.preview
}
resource "vercel_env" "database_url_prod" {
  project_id = vercel_project.perfolio.id
  target     = ["production"]
  key        = "DATABASE_URL"
  value      = var.database_urls.prod
}

resource "vercel_env" "database_url_shadow" {
  project_id = vercel_project.perfolio.id
  target     = ["development"]
  key        = "SHADOW_DATABASE_URL"
  value      = var.database_urls.shadow
}
resource "vercel_env" "database_url_dev_pool" {
  project_id = vercel_project.perfolio.id
  target     = ["development"]
  key        = "DATABASE_URL_POOL"
  value      = var.database_urls.dev_pool
}
resource "vercel_env" "database_url_preview_pool" {
  project_id = vercel_project.perfolio.id
  target     = ["preview"]
  key        = "DATABASE_URL_POOL"
  value      = var.database_urls.preview_pool
}
resource "vercel_env" "database_url_prod_pool" {
  project_id = vercel_project.perfolio.id
  target     = ["production"]
  key        = "DATABASE_URL_POOL"
  value      = var.database_urls.prod_pool
}
