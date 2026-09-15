variable "name_prefix" {
  type        = string
  description = "Prefix for resource names, typically project-environment."
}

variable "project_name" {
  type        = string
  description = "Project name used in resource names."
}

variable "environment" {
  type        = string
  description = "Deployment environment."
}

variable "allowed_domain" {
  type        = string
  description = "Apex domain allowed in CloudFront Referer and Origin checks."
}

variable "account_id" {
  type        = string
  description = "AWS account ID used to make the S3 bucket name globally unique."
}

variable "function_code" {
  type        = string
  description = "Rendered CloudFront Function source (viewer-request Referer/Origin lock)."
}
