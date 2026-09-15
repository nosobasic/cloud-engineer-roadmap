output "email_identity_arn" {
  description = "SESv2 domain identity ARN."
  value       = aws_sesv2_email_identity.domain.arn
}

output "configuration_set_name" {
  description = "SESv2 configuration set name."
  value       = aws_sesv2_configuration_set.crm.configuration_set_name
}

output "dkim_tokens" {
  description = "Easy DKIM CNAME tokens for DNS publishing."
  value       = aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens
}

output "crm_sender_user_name" {
  description = "IAM user name for the external CRM sending engine."
  value       = aws_iam_user.crm_sender.name
}

output "crm_sender_user_arn" {
  description = "IAM user ARN for the external CRM sending engine."
  value       = aws_iam_user.crm_sender.arn
}
