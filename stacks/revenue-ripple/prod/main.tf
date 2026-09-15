data "aws_caller_identity" "current" {}

locals {
  name_prefix = "${var.project_name}-${var.environment}"
  ses_domain  = coalesce(var.ses_domain, var.allowed_domain)
}

module "video_cdn" {
  source = "../../../modules/video_cdn"

  name_prefix    = local.name_prefix
  project_name   = var.project_name
  environment    = var.environment
  allowed_domain = var.allowed_domain
  account_id     = data.aws_caller_identity.current.account_id
  function_code = templatefile("${path.module}/../../../modules/video_cdn/referer-lock.js", {
    allowed_domain = var.allowed_domain
  })
}

module "email" {
  count  = var.enable_email ? 1 : 0
  source = "../../../modules/email"

  name_prefix = local.name_prefix
  ses_domain  = local.ses_domain
}
