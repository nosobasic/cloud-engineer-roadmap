variable "name_prefix" {
  type        = string
  description = "Prefix for resource names, typically project-environment."
}

variable "ses_domain" {
  type        = string
  description = "Domain to verify as an SESv2 email identity."
}
