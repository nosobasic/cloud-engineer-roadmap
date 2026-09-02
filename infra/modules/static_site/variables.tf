variable "name" {
  description = "Name prefix used for the bucket and CloudFront comment."
  type        = string
}

variable "tags" {
  description = "Extra tags merged onto S3 and CloudFront. Project and ManagedBy come from provider default_tags."
  type        = map(string)
  default     = {}
}
