resource "aws_db_subnet_group" "app" {
  name       = "${var.name}-db-subnets"
  subnet_ids = var.subnet_ids

  tags = merge(var.tags, { Name = "${var.name}-db-subnets" })
}

resource "aws_db_instance" "app" {
  identifier = substr("${var.name}-postgres", 0, 63)

  engine         = "postgres"
  engine_version = "16"
  instance_class = var.instance_class

  allocated_storage = 20
  storage_type      = "gp3"
  db_name           = var.db_name
  username          = var.username
  password          = var.password

  db_subnet_group_name   = aws_db_subnet_group.app.name
  vpc_security_group_ids = var.security_group_ids
  publicly_accessible    = false
  multi_az               = false

  skip_final_snapshot     = true
  deletion_protection     = false
  backup_retention_period = 0

  tags = merge(var.tags, { Name = "${var.name}-rds" })
}
