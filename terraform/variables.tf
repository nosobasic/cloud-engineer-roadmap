variable "aws_region" {
  description = "AWS region to deploy into."
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "Optional named profile from ~/.aws/credentials. Leave null to use the default chain."
  type        = string
  default     = null
}

variable "project_name" {
  description = "Prefix used on resource names and tags."
  type        = string
  default     = "tf-practice"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "instance_type" {
  description = "EC2 instance type."
  type        = string
  default     = "t3.micro"
}

variable "instance_count" {
  description = "Number of EC2 instances behind the ALB (1 per AZ, max 2 with this layout)."
  type        = number
  default     = 2
}

variable "key_name" {
  description = "Existing EC2 key pair name for SSH. Leave null to skip SSH key assignment."
  type        = string
  default     = null
}

variable "allowed_ssh_cidr" {
  description = "CIDR allowed to SSH to EC2. Set to your IP/32 if you enable a key pair."
  type        = string
  default     = "0.0.0.0/0"
}

variable "db_name" {
  description = "Initial database name."
  type        = string
  default     = "appdb"
}

variable "db_username" {
  description = "Master username for RDS."
  type        = string
  default     = "appadmin"
}

variable "db_instance_class" {
  description = "RDS instance class."
  type        = string
  default     = "db.t3.micro"
}
