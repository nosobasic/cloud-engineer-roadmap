output "bucket_name" {
  description = "Name of the S3 bucket that holds the site files."
  value       = aws_s3_bucket.this.id
}

output "distribution_id" {
  description = "CloudFront distribution ID (used for cache invalidation)."
  value       = aws_cloudfront_distribution.this.id
}

output "cloudfront_url" {
  description = "HTTPS URL of the CloudFront distribution."
  value       = "https://${aws_cloudfront_distribution.this.domain_name}"
}
