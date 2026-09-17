variable "name_prefix" {
  type        = string
  description = "Prefix for resource names, typically project-environment."
}

variable "region" {
  type        = string
  description = "AWS region for SES, Lambda, and SQS."
}

variable "ses_domain" {
  type        = string
  description = "Domain to verify as an SES identity (for example revenueripple.org)."
}

variable "from_address" {
  type        = string
  default     = "Donte from RR <hello@revenueripple.org>"
  description = "From header used by the due-worker and Founders Lambdas."
}

variable "app_base_url" {
  type        = string
  default     = "https://revenueripple.org"
}

variable "supabase_url" {
  type        = string
  description = "Supabase project URL (Project Settings → API)."
}

variable "supabase_service_role_key" {
  type        = string
  sensitive   = true
  description = "Supabase service_role secret. Never the anon key."
}

variable "email_send_enabled" {
  type        = bool
  default     = false
  description = "Lambda send gate. Keep false until DNS + SES production access are done."
}

variable "email_daily_send_cap" {
  type    = number
  default = 200
}

variable "email_physical_address" {
  type    = string
  default = "Revenue Ripple, Attn: Donte Willis"
}

variable "due_worker_rate_minutes" {
  type    = number
  default = 15
}

variable "templates_dir" {
  type        = string
  description = "Absolute path to the app repo email_crm/templates directory."
}
