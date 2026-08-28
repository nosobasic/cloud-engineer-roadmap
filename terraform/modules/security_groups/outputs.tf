output "alb_id" {
  description = "Security group ID for the ALB."
  value       = aws_security_group.alb.id
}

output "ec2_id" {
  description = "Security group ID for EC2."
  value       = aws_security_group.ec2.id
}

output "rds_id" {
  description = "Security group ID for RDS."
  value       = aws_security_group.rds.id
}
