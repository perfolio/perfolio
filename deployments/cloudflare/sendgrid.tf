resource "cloudflare_record" "url801-perfol-io" {
  name    = "url801.perfol.io"
  value   = "sendgrid.net"
  type    = "CNAME"
  zone_id = var.config.zone_id
}

resource "cloudflare_record" "23043673-perfol-io" {
  name    = "23043673.perfol.io"
  value   = "sendgrid.net"
  type    = "CNAME"
  zone_id = var.config.zone_id
}

resource "cloudflare_record" "em7361-perfol-io" {
  name    = "em7361.perfol.io"
  value   = "u23043673.wl174.sendgrid.net"
  type    = "CNAME"
  zone_id = var.config.zone_id
}

resource "cloudflare_record" "s1-_domainkey-perfol-io" {
  name    = "s1._domainkey.perfol.io"
  value   = "s1.domainkey.u23043673.wl174.sendgrid.net"
  type    = "CNAME"
  zone_id = var.config.zone_id
}


resource "cloudflare_record" "s2-_domainkey-perfol-io" {
  name    = "s2._domainkey.perfol.io"
  value   = "s2.domainkey.u23043673.wl174.sendgrid.net"
  type    = "CNAME"
  zone_id = var.config.zone_id
}

