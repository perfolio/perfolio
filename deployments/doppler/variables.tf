variable "database_urls" {
  type = object({
    dev     = string
    staging = string
    prod    = string
  })
  sensitive = true
}
