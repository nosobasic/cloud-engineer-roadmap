output "cloudfront_distribution_domain_name" {
  description = "CloudFront distribution domain name."
  value       = aws_cloudfront_distribution.videos.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID."
  value       = aws_cloudfront_distribution.videos.id
}

output "cloudfront_distribution_arn" {
  description = "CloudFront distribution ARN."
  value       = aws_cloudfront_distribution.videos.arn
}

output "s3_bucket_arn" {
  description = "Private video bucket ARN."
  value       = aws_s3_bucket.videos.arn
}

output "s3_bucket_name" {
  description = "Private video bucket name."
  value       = aws_s3_bucket.videos.id
}

output "render_uploader_user_name" {
  description = "IAM user name for Render uploads."
  value       = aws_iam_user.render_uploader.name
}

output "render_uploader_user_arn" {
  description = "IAM user ARN for Render uploads."
  value       = aws_iam_user.render_uploader.arn
}
