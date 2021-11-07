


resource "vercel_secret" "database_url_dev" {
  team_id = var.team_id
  name    = "database_url_dev"
  value   = var.database_urls.dev
}
resource "vercel_env" "database_url_dev" {
  project_id = vercel_project.perfolio.id
  target     = ["development"]
  type       = "secret"
  key        = "DATABASE_URL"
  value      = vercel_secret.database_url_dev.id
}


resource "vercel_secret" "database_url_preview" {
  team_id = var.team_id
  name    = "database_url_preview"
  value   = var.database_urls.preview
}
resource "vercel_env" "database_url_preview" {
  project_id = vercel_project.perfolio.id
  target     = ["preview"]
  type       = "secret"
  key        = "DATABASE_URL"
  value      = vercel_secret.database_url_preview.id
}

resource "vercel_secret" "database_url_production" {
  team_id = var.team_id
  name    = "database_url_production"
  value   = var.database_urls.prod
}
resource "vercel_env" "database_url_production" {
  project_id = vercel_project.perfolio.id
  target     = ["production"]
  type       = "secret"
  key        = "DATABASE_URL"
  value      = vercel_secret.database_url_production.id
}





resource "vercel_secret" "database_url_dev_pool" {
  team_id = var.team_id
  name    = "database_url_dev_pool"
  value   = var.database_urls.dev_pool
}
resource "vercel_env" "database_url_dev_pool" {
  project_id = vercel_project.perfolio.id
  target     = ["development"]
  type       = "secret"
  key        = "DATABASE_URL_POOL"
  value      = vercel_secret.database_url_dev_pool.id
}


resource "vercel_secret" "database_url_preview_pool" {
  team_id = var.team_id
  name    = "database_url_preview_pool"
  value   = var.database_urls.preview_pool
}
resource "vercel_env" "database_url_preview_pool" {
  project_id = vercel_project.perfolio.id
  target     = ["preview"]
  type       = "secret"
  key        = "DATABASE_URL_POOL"
  value      = vercel_secret.database_url_preview_pool.id
}

resource "vercel_secret" "database_url_production_pool" {
  team_id = var.team_id
  name    = "database_url_production_pool"
  value   = var.database_urls.prod_pool
}
resource "vercel_env" "database_url_production_pool" {
  project_id = vercel_project.perfolio.id
  target     = ["production"]
  type       = "secret"
  key        = "DATABASE_URL_POOL"
  value      = vercel_secret.database_url_production_pool.id
}
