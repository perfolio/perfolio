variable "database_urls" {
  type = object({
    cluster = string
    dev     = string
    staging = string
    prod    = string
    shadow  = string
  })
  sensitive = true
}
