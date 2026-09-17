variable "aws_region" {
  type        = string
  description = "AWS region for regional resources (S3, SES, IAM)."
}

variable "aws_profile" {
  type        = string
  default     = null
  description = "Optional named profile from ~/.aws/credentials. Leave null to use the default chain."
}

variable "project_name" {
  type        = string
  description = "Project name used in resource names and tags."

  validation {
    condition     = can(regex("^[a-z0-9-]+$", var.project_name))
    error_message = "project_name must be lowercase alphanumeric with hyphens."
  }
}

variable "environment" {
  type        = string
  description = "Deployment environment tag (for example prod, staging, or dev)."

  validation {
    condition     = contains(["prod", "staging", "dev"], var.environment)
    error_message = "environment must be prod, staging, or dev."
  }
}

variable "allowed_domain" {
  type        = string
  description = "Apex domain used for CloudFront Referer/Origin locking (for example revenueripple.org)."
}

variable "ses_domain" {
  type        = string
  default     = null
  nullable    = true
  description = "Domain identity to verify in SES. Defaults to allowed_domain when omitted."
}

variable "enable_email" {
  type        = bool
  default     = false
  description = "Set true to create SES, Lambdas, SQS, and the template bucket."
}

variable "email_send_enabled" {
  type        = bool
  default     = false
  description = "Lambda/SES send gate. Keep false until DNS + production access."
}

variable "email_from_address" {
  type        = string
  default     = "Donte Willis <hello@revenueripple.org>"
}

variable "app_base_url" {
  type        = string
  default     = "https://revenueripple.org"
}

variable "email_physical_address" {
  type    = string
  default = "Revenue Ripple, Attn: Donte Willis"
}

variable "email_daily_send_cap" {
  type    = number
  default = 200
}

variable "email_templates_dir" {
  type        = string
  default     = "/Users/donte/react-router-basics/revenue-ripple/email_crm/templates"
  description = "Absolute path to email_crm/templates in the app repo."
}

variable "supabase_url" {
  type        = string
  default     = null
  nullable    = true
  description = "Supabase project URL. Required when enable_email is true."
}

variable "supabase_service_role_key" {
  type        = string
  default     = null
  nullable    = true
  sensitive   = true
  description = "Supabase service_role secret. Required when enable_email is true."
}
