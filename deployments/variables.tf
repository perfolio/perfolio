variable "cloudflare" {
  description = "Cloudflare secrets"
  type = object({
    api_token = string
    zone_id   = string

  })
  sensitive = true

}


variable "vercel_token" {
  type      = string
  sensitive = true
}