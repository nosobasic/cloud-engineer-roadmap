variable "aws_region" {
  description = "AWS region to deploy into."
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "Optional named profile from ~/.aws/credentials. Leave null to use the default chain."
  type        = string
  default     = null
}

variable "project_name" {
  description = "Prefix used on resource names and tags."
  type        = string
  default     = "tf-practice"
}
