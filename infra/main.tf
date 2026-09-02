resource "random_pet" "name" {
  length = 2
}

locals {
  # Globally unique prefix: project_name + two random words (lab buckets cannot collide).
  name = "${var.project_name}-${random_pet.name.id}"
}

module "static_site" {
  source = "./modules/static_site"

  name = local.name
}
