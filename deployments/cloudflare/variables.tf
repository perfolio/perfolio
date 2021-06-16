variable "config" {
  description = "Cloudflare secrets"
  type = object({
    api_token   = string
    zone_id   = string

  })
  sensitive = true

}