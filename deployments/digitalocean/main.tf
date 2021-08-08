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

resource "digitalocean_database_connection_pool" "prod_pool" {
  cluster_id = digitalocean_database_cluster.cluster.id
  name       = "prod_pool"
  mode       = "transaction"
  size       = 5
  db_name    = digitalocean_database_db.prod.name
  user       = "doadmin"
}

resource "digitalocean_database_db" "preview" {
  cluster_id = digitalocean_database_cluster.cluster.id
  name       = "preview"
}

resource "digitalocean_database_connection_pool" "preview_pool" {
  cluster_id = digitalocean_database_cluster.cluster.id
  name       = "preview_pool"
  mode       = "transaction"
  size       = 5
  db_name    = digitalocean_database_db.preview.name
  user       = "doadmin"
}
resource "digitalocean_database_db" "dev" {
  cluster_id = digitalocean_database_cluster.cluster.id
  name       = "dev"
}

resource "digitalocean_database_connection_pool" "dev_pool" {
  cluster_id = digitalocean_database_cluster.cluster.id
  name       = "dev_pool"
  mode       = "transaction"
  size       = 5
  db_name    = digitalocean_database_db.dev.name
  user       = "doadmin"
}



resource "digitalocean_database_db" "shadow" {
  cluster_id = digitalocean_database_cluster.cluster.id
  name       = "shadow"
}
