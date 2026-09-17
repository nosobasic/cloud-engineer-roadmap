output "email_identity_arn" {
  description = "SES domain identity ARN."
  value       = aws_ses_domain_identity.main.arn
}

output "ses_domain_verification_token" {
  description = "TXT record value for _amazonses.<domain>."
  value       = aws_ses_domain_identity.main.verification_token
}

output "dkim_tokens" {
  description = "Easy DKIM CNAME tokens for DNS."
  value       = aws_ses_domain_dkim.main.dkim_tokens
}

output "ses_mail_from_domain" {
  description = "Custom MAIL FROM subdomain (mail.<domain>)."
  value       = aws_ses_domain_mail_from.main.mail_from_domain
}

output "configuration_set_name" {
  description = "SES configuration set name (SES_CONFIGURATION_SET on Render)."
  value       = aws_ses_configuration_set.main.name
}

output "founders_queue_url" {
  description = "FIFO queue URL (EMAIL_FOUNDERS_QUEUE_URL on Render)."
  value       = aws_sqs_queue.founders.url
}

output "founders_dlq_url" {
  value = aws_sqs_queue.founders_dlq.url
}

output "template_bucket" {
  value = aws_s3_bucket.templates.id
}

output "due_worker_name" {
  value = aws_lambda_function.due_worker.function_name
}

output "crm_sender_user_name" {
  description = "IAM user for Render. Create access keys in the IAM console."
  value       = aws_iam_user.crm_sender.name
}

output "crm_sender_user_arn" {
  value = aws_iam_user.crm_sender.arn
}
