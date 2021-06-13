
resource "checkly_check_group" "companies" {
  name         = "companies"
  activated    = true
  double_check = true
  concurrency  = 8
  locations = [
    "eu-central-1"
  ]



}

resource "checkly_check" "get_company" {
  name                   = "Fails due to missing autorization header"
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
    url              = "https://api.perfol.io/api/companies/getCompany"
    method           = "POST"
    headers = {
      "Content-Type" = "application/json"
    }

    assertion {
      source     = "STATUS_CODE"
      property   = ""
      comparison = "EQUALS"
      target     = "400"
    }
    
  }
}