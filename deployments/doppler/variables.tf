variable "database_urls" {
  type = object({
    dev          = string
    preview      = string
    prod         = string
    shadow       = string
    dev_pool     = string
    preview_pool = string
    prod_pool    = string
  })
  sensitive = true
}
