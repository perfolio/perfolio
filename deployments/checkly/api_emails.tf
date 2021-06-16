
resource "checkly_check_group" "emails" {
  name         = "emails"
  activated    = true
  double_check = true
  concurrency  = 8
  locations = [
    "eu-central-1"
  ]



}

resource "checkly_check" "subscribe" {
  name                   = "/v1/emails/subscribe: successfully enters an email"
  type                   = "API"
  activated              = true
  frequency              = 5
  group_id               = checkly_check_group.emails.id
  degraded_response_time = 3000
  max_response_time      = 9000
  locations = [
    "eu-central-1"
  ]
  request {
    follow_redirects = true
    url              = "https://api.perfol.io/v1/emails/subscribe"
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