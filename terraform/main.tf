resource "random_pet" "name" {
  length = 2
}

resource "random_password" "db" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

locals {
  name = "${var.project_name}-${random_pet.name.id}"

  tags = {
    Project   = var.project_name
    ManagedBy = "terraform"
  }
}

module "vpc" {
  source = "./modules/vpc"

  name     = local.name
  tags     = local.tags
  vpc_cidr = var.vpc_cidr
}

module "security_groups" {
  source = "./modules/security_groups"

  name             = local.name
  tags             = local.tags
  vpc_id           = module.vpc.vpc_id
  allowed_ssh_cidr = var.allowed_ssh_cidr
}

module "ec2" {
  source = "./modules/ec2"

  name               = local.name
  tags               = local.tags
  instance_type      = var.instance_type
  instance_count     = var.instance_count
  key_name           = var.key_name
  subnet_ids         = module.vpc.public_subnet_ids
  security_group_ids = [module.security_groups.ec2_id]
}

module "alb" {
  source = "./modules/alb"

  name               = local.name
  tags               = local.tags
  vpc_id             = module.vpc.vpc_id
  subnet_ids         = module.vpc.public_subnet_ids
  security_group_ids = [module.security_groups.alb_id]
  instance_ids       = module.ec2.instance_ids
}

module "rds" {
  source = "./modules/rds"

  name               = local.name
  tags               = local.tags
  subnet_ids         = module.vpc.private_subnet_ids
  security_group_ids = [module.security_groups.rds_id]
  instance_class     = var.db_instance_class
  db_name            = var.db_name
  username           = var.db_username
  password           = random_password.db.result
}
