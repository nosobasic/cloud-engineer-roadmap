variable "name" {
  description = "Name prefix for RDS resources."
  type        = string
}

variable "tags" {
  description = "Tags applied to RDS resources."
  type        = map(string)
}

variable "subnet_ids" {
  description = "Private subnets for the DB subnet group."
  type        = list(string)
}

variable "security_group_ids" {
  description = "Security groups attached to RDS."
  type        = list(string)
}

variable "instance_class" {
  description = "RDS instance class."
  type        = string
}

variable "db_name" {
  description = "Initial database name."
  type        = string
}

variable "username" {
  description = "Master username."
  type        = string
}

variable "password" {
  description = "Master password."
  type        = string
  sensitive   = true
}
