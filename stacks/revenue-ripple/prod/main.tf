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

  name_prefix               = local.name_prefix
  region                    = var.aws_region
  ses_domain                = local.ses_domain
  from_address              = var.email_from_address
  app_base_url              = var.app_base_url
  supabase_url              = var.supabase_url
  supabase_service_role_key = var.supabase_service_role_key
  email_send_enabled        = var.email_send_enabled
  email_daily_send_cap      = var.email_daily_send_cap
  email_physical_address    = var.email_physical_address
  templates_dir             = var.email_templates_dir
}
