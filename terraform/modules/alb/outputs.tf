output "dns_name" {
  description = "Public DNS name of the load balancer."
  value       = aws_lb.app.dns_name
}
