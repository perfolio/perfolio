
resource "checkly_check_group" "companies" {
  name         = "companies"
  activated    = true
  double_check = true
  concurrency  = 8
  locations = [
    "eu-central-1"
  ]



}

resource "checkly_check" "subscribe" {
  name                   = "Successfully enters an email"
  type                   = "API"
  activated              = true
  frequency              = 5
  group_id               = checkly_check_group.companies.id
  degraded_response_time = 3000
  max_response_time      = 9000
  locations = [
    "eu-central-1"
  ]
  request {
    follow_redirects = true
    url              = "https://api.perfol.io/api/emails/subscribe"
    method           = "POST"
    headers = {
      "Content-Type" = "application/json"
    }
    body = jsonencode({"email" = "emailsubscribetest@perfol.io"})

    assertion {
      source     = "STATUS_CODE"
      comparison = "EQUALS"
      target     = "200"
    }

  }
}