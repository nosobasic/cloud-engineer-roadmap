variable "name" {
  description = "Name prefix for EC2 instances."
  type        = string
}

variable "tags" {
  description = "Tags applied to EC2 instances."
  type        = map(string)
}

variable "instance_type" {
  description = "EC2 instance type."
  type        = string
}

variable "instance_count" {
  description = "Number of EC2 instances to launch."
  type        = number
}

variable "key_name" {
  description = "Existing EC2 key pair name. Null skips SSH key assignment."
  type        = string
  default     = null
}

variable "subnet_ids" {
  description = "Subnets to place instances in (round-robin)."
  type        = list(string)
}

variable "security_group_ids" {
  description = "Security groups attached to each instance."
  type        = list(string)
}
