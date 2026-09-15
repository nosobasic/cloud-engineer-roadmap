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
  description = "Set true to also create the SES identity and CRM sender IAM user."
}
