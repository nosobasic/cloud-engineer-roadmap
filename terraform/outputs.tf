output "alb_dns_name" {
  description = "Public DNS name of the Application Load Balancer."
  value       = module.alb.dns_name
}

output "ec2_public_ips" {
  description = "Public IPs of the EC2 instances."
  value       = module.ec2.public_ips
}

output "rds_endpoint" {
  description = "RDS hostname and port. Reachable from EC2, not from the internet."
  value       = module.rds.endpoint
}

output "rds_username" {
  description = "Master username for RDS."
  value       = module.rds.username
}

output "rds_password" {
  description = "Generated master password. Store this somewhere safe; it is only in Terraform state."
  value       = random_password.db.result
  sensitive   = true
}
