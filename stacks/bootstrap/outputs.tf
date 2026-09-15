output "state_bucket_name" {
  description = "S3 bucket to put in each stack's backend \"bucket\" argument."
  value       = aws_s3_bucket.tfstate.id
}

output "lock_table_name" {
  description = "DynamoDB table to put in each stack's backend \"dynamodb_table\" argument."
  value       = aws_dynamodb_table.locks.name
}
