output "cloudfront_url" {
  description = "HTTPS URL of the CloudFront distribution."
  value       = module.static_site.cloudfront_url
}

output "bucket_name" {
  description = "S3 bucket that holds the Vite dist/ files."
  value       = module.static_site.bucket_name
}

output "distribution_id" {
  description = "CloudFront distribution ID. Pass this to aws cloudfront create-invalidation after a sync."
  value       = module.static_site.distribution_id
}
