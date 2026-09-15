variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS region where the existing binGone resources live."
}

variable "aws_profile" {
  type        = string
  default     = null
  description = "Optional named profile from ~/.aws/credentials."
}

variable "project_name" {
  type        = string
  default     = "bingone"
  description = "Project name used in tags."
}

variable "environment" {
  type        = string
  default     = "prod"
  description = "Deployment environment tag."
}
