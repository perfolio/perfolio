output "database_url_prod" {
  value = "postgresql://${digitalocean_database_cluster.cluster.user}:${digitalocean_database_cluster.cluster.password}@${digitalocean_database_cluster.cluster.host}:${digitalocean_database_cluster.cluster.port}/${digitalocean_database_db.prod.name}?sslmode=require"
}

output "database_url_staging" {
  value = "postgresql://${digitalocean_database_cluster.cluster.user}:${digitalocean_database_cluster.cluster.password}@${digitalocean_database_cluster.cluster.host}:${digitalocean_database_cluster.cluster.port}/${digitalocean_database_db.staging.name}?sslmode=require"
}
output "database_url_shadow" {
  value = "postgresql://${digitalocean_database_cluster.cluster.user}:${digitalocean_database_cluster.cluster.password}@${digitalocean_database_cluster.cluster.host}:${digitalocean_database_cluster.cluster.port}/${digitalocean_database_db.shadow.name}?sslmode=require"
}
output "database_url_prod_pool" {
  value = digitalocean_database_connection_pool.prod_pool.uri
}


output "database_url_staging_pool" {
  value = digitalocean_database_connection_pool.staging_pool.uri
}

output "database_url_dev_pool" {
  value = digitalocean_database_connection_pool.dev_pool.uri
}