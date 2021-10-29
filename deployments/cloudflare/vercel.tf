
resource "cloudflare_record" "perfolio" {
  name    = "perfol.io"
  value   = "76.76.21.21"
  type    = "A"
  zone_id = var.config.zone_id
}

resource "cloudflare_record" "www" {
  name    = "www"
  value   = "cname.vercel-dns.com"
  type    = "CNAME"
  zone_id = var.config.zone_id
}




