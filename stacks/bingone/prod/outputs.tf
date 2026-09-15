output "account_id" {
  description = "AWS account this stack would manage. Useful as a sanity check before import."
  value       = data.aws_caller_identity.current.account_id
}
