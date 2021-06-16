resource "cloudflare_record" "url6754-perfol-io" {
  name    = "url6754.perfol.io"
  value   = "sendgrid.net"
  type    = "CNAME"
  zone_id = var.config.zone_id
}

resource "cloudflare_record" "A22268761-perfol-io" {
  name    = "22268761.perfol.io"
  value   = "sendgrid.net"
  type    = "CNAME"
  zone_id = var.config.zone_id
}

resource "cloudflare_record" "em1023-perfol-io" {
  name    = "em1023.perfol.io"
  value   = "u22268761.wl012.sendgrid.net"
  type    = "CNAME"
  zone_id = var.config.zone_id
}

resource "cloudflare_record" "s1-_domainkey-perfol-io" {
  name    = "s1._domainkey.perfol.io"
  value   = "s1.domainkey.u22268761.wl012.sendgrid.net"
  type    = "CNAME"
  zone_id = var.config.zone_id
}


resource "cloudflare_record" "s2-_domainkey-perfol-io" {
  name    = "s2._domainkey.perfol.io"
  value   = "s2.domainkey.u22268761.wl012.sendgrid.net"
  type    = "CNAME"
  zone_id = var.config.zone_id
}

