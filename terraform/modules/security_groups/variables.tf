variable "name" {
  description = "Name prefix for security groups."
  type        = string
}

variable "tags" {
  description = "Tags applied to all security groups."
  type        = map(string)
}

variable "vpc_id" {
  description = "VPC to attach the security groups to."
  type        = string
}

variable "allowed_ssh_cidr" {
  description = "CIDR allowed to SSH to EC2."
  type        = string
}
