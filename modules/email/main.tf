data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

resource "aws_sesv2_configuration_set" "crm" {
  configuration_set_name = "${var.name_prefix}-crm"

  delivery_options {
    tls_policy = "REQUIRE"
  }

  reputation_options {
    reputation_metrics_enabled = true
  }
}

resource "aws_sesv2_email_identity" "domain" {
  email_identity         = var.ses_domain
  configuration_set_name = aws_sesv2_configuration_set.crm.configuration_set_name

  dkim_signing_attributes {
    next_signing_key_length = "RSA_2048_BIT"
  }
}

# New AWS accounts start in the SES sandbox. Production sending to arbitrary
# recipients requires a support request to leave the sandbox; Terraform cannot
# perform that account-level change.

# After apply, copy terraform output ses_dkim_tokens and publish the following
# records at Route 53 or your external DNS host. Uncomment and set zone_id if
# this domain is hosted in Route 53.

# resource "aws_route53_record" "ses_dkim" {
#   count   = 3
#   zone_id = "ZXXXXXXXXXXXXXXXXXXXX"
#   name    = "${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}._domainkey.${var.ses_domain}"
#   type    = "CNAME"
#   ttl     = 300
#   records = ["${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}.dkim.amazonses.com"]
# }

# resource "aws_route53_record" "ses_spf" {
#   zone_id = "ZXXXXXXXXXXXXXXXXXXXX"
#   name    = var.ses_domain
#   type    = "TXT"
#   ttl     = 300
#   records = ["v=spf1 include:amazonses.com -all"]
# }

# resource "aws_route53_record" "ses_dmarc" {
#   zone_id = "ZXXXXXXXXXXXXXXXXXXXX"
#   name    = "_dmarc.${var.ses_domain}"
#   type    = "TXT"
#   ttl     = 300
#   records = ["v=DMARC1; p=quarantine; rua=mailto:dmarc@${var.ses_domain}"]
# }

resource "aws_iam_user" "crm_sender" {
  name = "${var.name_prefix}-crm-ses-sender"
  path = "/system/"
}

data "aws_iam_policy_document" "crm_sender" {
  statement {
    sid    = "SendAsVerifiedDomain"
    effect = "Allow"
    actions = [
      "ses:SendEmail",
      "ses:SendRawEmail",
      "sesv2:SendEmail"
    ]
    resources = [
      aws_sesv2_email_identity.domain.arn,
      aws_sesv2_configuration_set.crm.arn,
      "arn:aws:ses:${data.aws_region.current.region}:${data.aws_caller_identity.current.account_id}:identity/${var.ses_domain}"
    ]
  }
}

resource "aws_iam_user_policy" "crm_sender" {
  name   = "ses-send-as-domain"
  user   = aws_iam_user.crm_sender.name
  policy = data.aws_iam_policy_document.crm_sender.json
}
