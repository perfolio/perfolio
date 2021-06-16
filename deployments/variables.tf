

variable "checkly_api_key" {
  type = string
}

variable "cloudflare" {
  description = "Cloudflare secrets"
  type = object({
    api_token = string
    zone_id   = string

  })
  sensitive = true

}