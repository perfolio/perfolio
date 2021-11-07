


resource "vercel_secret" "database_url_dev" {
  team_id    = var.team_id
  project_id = vercel_project.perfolio.id
  name       = "DATABASE_URL"
  value      = var.database_urls.dev
}
resource "vercel_env" "database_url_dev" {
  project_id = vercel_project.perfolio.id
  target     = ["development"]
  type       = "secret"
  key        = "DATABASE_URL"
  value      = vercel_secret.database_url_dev.id
}


resource "vercel_secret" "database_url_preview" {
  team_id    = var.team_id
  project_id = vercel_project.perfolio.id
  name       = "DATABASE_URL"
  value      = var.database_urls.preview
}
resource "vercel_env" "database_url_preview" {
  project_id = vercel_project.perfolio.id
  target     = ["preview"]
  type       = "secret"
  key        = "DATABASE_URL"
  value      = vercel_secret.database_url_preview.id
}

resource "vercel_secret" "database_url_production" {
  team_id    = var.team_id
  project_id = vercel_project.perfolio.id
  name       = "DATABASE_URL"
  value      = var.database_urls.production
}
resource "vercel_env" "database_url_production" {
  project_id = vercel_project.perfolio.id
  target     = ["production"]
  type       = "secret"
  key        = "DATABASE_URL"
  value      = vercel_secret.database_url_production.id
}
