variable "name" {
  description = "Name prefix for ALB resources."
  type        = string
}

variable "tags" {
  description = "Tags applied to ALB resources."
  type        = map(string)
}

variable "vpc_id" {
  description = "VPC for the target group."
  type        = string
}

variable "subnet_ids" {
  description = "Public subnets for the load balancer."
  type        = list(string)
}

variable "security_group_ids" {
  description = "Security groups attached to the ALB."
  type        = list(string)
}

variable "instance_ids" {
  description = "EC2 instance IDs to register with the target group."
  type        = list(string)
}
