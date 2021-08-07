variable "database_urls" {
  type = object({
    dev     = string
    staging = string
    prod    = string
    shadow  = string
  })
  sensitive = true
}
