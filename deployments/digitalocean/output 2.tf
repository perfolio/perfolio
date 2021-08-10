output "database_url_prod" {
  value = digitalocean_database_connection_pool.prod.uri
}

output "database_url_staging" {
  value = digitalocean_database_connection_pool.staging.uri
}

output "database_url_dev" {
  value = digitalocean_database_connection_pool.dev.uri
}
output "database_url_shadow" {
  value = digitalocean_database_connection_pool.shadow.uri
}