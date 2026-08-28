output "endpoint" {
  description = "RDS hostname and port."
  value       = aws_db_instance.app.endpoint
}

output "username" {
  description = "Master username."
  value       = aws_db_instance.app.username
}
