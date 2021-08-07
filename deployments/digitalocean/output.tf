output "database_cluster_uri" {
  value = digitalocean_database_cluster.cluster.uri
}
output "database_url_prod_pool" {
  value = digitalocean_database_connection_pool.prod_pool.uri
}



output "database_url_staging" {
  value = digitalocean_database_connection_pool.staging_pool.uri
}

output "database_url_dev" {
  value = digitalocean_database_connection_pool.dev_pool.uri
}
output "database_url_shadow" {
  value = digitalocean_database_connection_pool.shadow_pool.uri
}