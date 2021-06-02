
variable "digitalocean_token" {
  type = string
}
provider "digitalocean" {
  token = var.digitalocean_token
}


resource "digitalocean_database_cluster" "perfolio" {
  name       = "perfolio"
  engine     = "pg"
  version    = "13"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc1"
  node_count = 1
}

resource "digitalocean_database_db" "development" {
  cluster_id = digitalocean_database_cluster.perfolio.id
  name       = "development"
}

resource "digitalocean_database_connection_pool" "development" {
  cluster_id = digitalocean_database_cluster.perfolio.id
  name       = "development"
  mode       = "transaction"
  size       = 20
  db_name    = digitalocean_database_db.development.name
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

  user = digitalocean_database_cluster.perfolio.user
}



resource "digitalocean_database_db" "production" {
  cluster_id = digitalocean_database_cluster.perfolio.id
  name       = "production"
}

resource "digitalocean_database_connection_pool" "production" {
  cluster_id = digitalocean_database_cluster.perfolio.id
  name       = "production"
  mode       = "transaction"
  size       = 20
  db_name    = digitalocean_database_db.production.name
  user       = digitalocean_database_cluster.perfolio.user
}
