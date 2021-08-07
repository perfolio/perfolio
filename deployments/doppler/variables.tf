variable "database_urls" {
  type = object({
    cluster      = string
    shadow       = string
    dev_pool     = string
    staging_pool = string
    prod_pool    = string
  })
  sensitive = true
}
