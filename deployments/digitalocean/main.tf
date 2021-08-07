resource "digitalocean_database_cluster" "cluster" {
  name       = "cluster"
  engine     = "pg"
  version    = "13"
  size       = "db-s-1vcpu-1gb"
  region     = "fra1"
  node_count = 1
}


resource "digitalocean_database_db" "prod" {
  cluster_id = digitalocean_database_cluster.cluster.id
  name       = "prod"
}

resource "digitalocean_database_connection_pool" "prod" {
  cluster_id = digitalocean_database_cluster.prod.id
  name       = "pool_prod"
  mode       = "transaction"
  size       = 20
  db_name    = digitalocean_database_db.prod.name
  user       = "doadmin"
}

resource "digitalocean_database_db" "staging" {
  cluster_id = digitalocean_database_cluster.cluster.id
  name       = "staging"
}

resource "digitalocean_database_connection_pool" "staging" {
  cluster_id = digitalocean_database_cluster.staging.id
  name       = "pool_staging"
  mode       = "transaction"
  size       = 20
  db_name    = digitalocean_database_db.staging.name
  user       = "doadmin"
}
resource "digitalocean_database_db" "dev" {
  cluster_id = digitalocean_database_cluster.cluster.id
  name       = "dev"
}

resource "digitalocean_database_connection_pool" "pool_dev" {
  cluster_id = digitalocean_database_cluster.staging.id
  name       = "pool_dev"
  mode       = "transaction"
  size       = 20
  db_name    = digitalocean_database_db.staging.name
  user       = "doadmin"
}

