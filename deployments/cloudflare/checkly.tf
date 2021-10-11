

resource "cloudflare_record" "accounts" {
  name     = "accounts.perfol.io"
  value    = "accounts.clerk.services"
  type     = "CNAME"
  priority = 1
  zone_id  = var.config.zone_id

}

resource "cloudflare_record" "clerk" {
  name     = "clerk.perfol.io"
  value    = "frontend-api.clerk.services"
  type     = "CNAME"
  priority = 1
  zone_id  = var.config.zone_id

}




resource "cloudflare_record" "clerk-app" {
  name     = "clerk.app.perfol.io"
  value    = "frontend-api.clerk.services"
  type     = "CNAME"
  priority = 1
  zone_id  = var.config.zone_id

}




resource "cloudflare_record" "clk1" {
  name     = "clk._domainkey.perfol.io"
  value    = "dkim1.yao7h1rmxss9.clerk.services"
  type     = "CNAME"
  priority = 1
  zone_id  = var.config.zone_id

}


resource "cloudflare_record" "clk2" {
  name     = "clk2._domainkey.perfol.io"
  value    = "dkim2.yao7h1rmxss9.clerk.services"
  type     = "CNAME"
  priority = 1
  zone_id  = var.config.zone_id

}




resource "cloudflare_record" "mail" {
  name     = "mail.perfol.io"
  value    = "mail.yao7h1rmxss9.clerk.services"
  type     = "CNAME"
  priority = 1
  zone_id  = var.config.zone_id

}