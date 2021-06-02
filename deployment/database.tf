
variable "digitalocean_token" {
  type = string
}
provider "digitalocean" {
  token = var.digitalocean_token
}


resource "digitalocean_database_cluster" "perfolio" {
  name       = "perfolio"
  engine     = "pg"
  version    = "12"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc1"
  node_count = 1
}

resource "digitalocean_database_db" "dev" {
  cluster_id = digitalocean_database_cluster.perfolio.id
  name       = "dev"
}
resource "digitalocean_database_connection_pool" "dev" {
  cluster_id = digitalocean_database_cluster.perfolio.id
  name       = "serverless_dev"
  mode       = "transaction"
  size       = 12
  db_name    = digitalocean_database_db.dev.name
  user       = digitalocean_database_cluster.perfolio.user
}

/**
* Create a shadow database for prismas migrations
*/
resource "digitalocean_database_db" "shadow" {
  cluster_id = digitalocean_database_cluster.perfolio.id
  name       = "shadow"
}

resource "digitalocean_database_connection_pool" "shadow" {
  cluster_id = digitalocean_database_cluster.perfolio.id
  name       = "prisma_shadow_db"
  mode       = "transaction"
  size       = 2
  db_name    = digitalocean_database_db.shadow.name
  user       = digitalocean_database_cluster.perfolio.user
}
