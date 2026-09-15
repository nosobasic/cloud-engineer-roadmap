variable "aws_region" {
  description = "AWS region for the state bucket and lock table."
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "Optional named profile from ~/.aws/credentials. Leave null to use the default chain."
  type        = string
  default     = null
}

variable "state_bucket_name" {
  description = "Globally unique S3 bucket name that will store Terraform state for every stack."
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$", var.state_bucket_name))
    error_message = "state_bucket_name must be a valid S3 bucket name."
  }
}

variable "lock_table_name" {
  description = "DynamoDB table name used for Terraform state locking."
  type        = string
}
