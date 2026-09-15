output "cloudfront_distribution_domain_name" {
  description = "CloudFront domain name for video playback URLs (dxxxxx.cloudfront.net)."
  value       = module.video_cdn.cloudfront_distribution_domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID."
  value       = module.video_cdn.cloudfront_distribution_id
}

output "s3_video_bucket_name" {
  description = "Name of the private video asset bucket."
  value       = module.video_cdn.s3_bucket_name
}

output "s3_video_bucket_arn" {
  description = "ARN of the private video asset bucket."
  value       = module.video_cdn.s3_bucket_arn
}

output "render_uploader_iam_user_name" {
  description = "IAM user for Render to upload objects. Create access keys in the IAM console; do not store keys in Terraform state."
  value       = module.video_cdn.render_uploader_user_name
}

output "ses_dkim_tokens" {
  description = "Easy DKIM tokens. Empty until enable_email is true."
  value       = var.enable_email ? module.email[0].dkim_tokens : []
}

output "ses_configuration_set_name" {
  description = "SESv2 configuration set name. Empty until enable_email is true."
  value       = var.enable_email ? module.email[0].configuration_set_name : null
}

output "crm_sender_iam_user_name" {
  description = "IAM user for the external CRM. Empty until enable_email is true."
  value       = var.enable_email ? module.email[0].crm_sender_user_name : null
}

output "video_prefix_keys" {
  description = "S3 folder prefixes created for course and marketing uploads."
  value       = sort(local.prefix_keys)
}
