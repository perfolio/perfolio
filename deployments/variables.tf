
variable "checkly_api_key" {
  type      = string
  sensitive = true

}

variable "cloudflare" {
  description = "Cloudflare secrets"
  type = object({
    api_token = string
    zone_id   = string

  })
  sensitive = true

}

variable "digitalocean_token" {
  type      = string
  sensitive = true
}

variable "doppler_token" {
  type      = string
  sensitive = true
}