


resource "cloudflare_record" "ionos0" {
  name     = "perfol.io"
  value    = "mx00.ionos.de"
  type     = "MX"
  priority = 1
  zone_id  = var.config.zone_id

}

resource "cloudflare_record" "ionos1" {
  name     = "perfol.io"
  value    = "mx01.ionos.de"
  type     = "MX"
  priority = 1
  zone_id  = var.config.zone_id

}