

variable "checkly_api_key" {
  type = string
}
provider "checkly" {
  api_key = var.checkly_api_key
}
