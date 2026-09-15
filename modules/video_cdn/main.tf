locals {
  s3_origin_id = "s3-videos"
  bucket_name  = "${var.project_name}-${var.environment}-videos-${var.account_id}"
  allowed_origins = distinct([
    "https://${var.allowed_domain}",
    "https://www.${trimprefix(var.allowed_domain, "www.")}"
  ])
}

resource "aws_s3_bucket" "videos" {
  bucket        = local.bucket_name
  force_destroy = false
}

resource "aws_s3_bucket_public_access_block" "videos" {
  bucket = aws_s3_bucket.videos.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "videos" {
  bucket = aws_s3_bucket.videos.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "videos" {
  bucket = aws_s3_bucket.videos.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_versioning" "videos" {
  bucket = aws_s3_bucket.videos.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "videos" {
  bucket = aws_s3_bucket.videos.id

  depends_on = [aws_s3_bucket_versioning.videos]

  rule {
    id     = "abort-incomplete-multipart"
    status = "Enabled"

    filter {}

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }

  rule {
    id     = "intelligent-tiering-archive"
    status = "Enabled"

    filter {}

    transition {
      days          = 0
      storage_class = "INTELLIGENT_TIERING"
    }
  }
}

resource "aws_s3_bucket_cors_configuration" "videos" {
  bucket = aws_s3_bucket.videos.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = local.allowed_origins
    expose_headers  = ["ETag", "Content-Length", "Content-Range"]
    max_age_seconds = 3600
  }
}

resource "aws_cloudfront_origin_access_control" "videos" {
  name                              = "${var.name_prefix}-videos-oac"
  description                       = "SigV4 OAC for ${local.bucket_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_function" "referer_lock" {
  name    = "${var.name_prefix}-referer-lock"
  runtime = "cloudfront-js-2.0"
  comment = "Deny viewer requests whose Referer or Origin does not include ${var.allowed_domain}"
  publish = true
  code    = var.function_code
}

resource "aws_cloudfront_response_headers_policy" "videos_cors" {
  name    = "${var.name_prefix}-videos-cors"
  comment = "CORS for video playback from ${var.allowed_domain}"

  cors_config {
    access_control_allow_credentials = false

    access_control_allow_headers {
      items = ["*"]
    }

    access_control_allow_methods {
      items = ["GET", "HEAD", "OPTIONS"]
    }

    access_control_allow_origins {
      items = local.allowed_origins
    }

    access_control_expose_headers {
      items = ["ETag", "Content-Length", "Content-Range"]
    }

    access_control_max_age_sec = 3600
    origin_override            = true
  }
}

resource "aws_cloudfront_distribution" "videos" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.name_prefix} video CDN"
  price_class         = "PriceClass_100"
  http_version        = "http2and3"
  wait_for_deployment = true

  origin {
    domain_name              = aws_s3_bucket.videos.bucket_regional_domain_name
    origin_id                = local.s3_origin_id
    origin_access_control_id = aws_cloudfront_origin_access_control.videos.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    cache_policy_id            = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    origin_request_policy_id   = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf"
    response_headers_policy_id = aws_cloudfront_response_headers_policy.videos_cors.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.referer_lock.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
    minimum_protocol_version       = "TLSv1.2_2021"
  }
}

data "aws_iam_policy_document" "videos_oac_read" {
  statement {
    sid    = "AllowCloudFrontServicePrincipalRead"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.videos.arn}/*"]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.videos.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "videos" {
  bucket = aws_s3_bucket.videos.id
  policy = data.aws_iam_policy_document.videos_oac_read.json

  depends_on = [aws_s3_bucket_public_access_block.videos]
}

resource "aws_iam_user" "render_uploader" {
  name = "${var.name_prefix}-render-video-uploader"
  path = "/system/"
}

data "aws_iam_policy_document" "render_uploader" {
  statement {
    sid    = "UploadVideoObjects"
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:AbortMultipartUpload",
      "s3:ListMultipartUploadParts"
    ]
    resources = ["${aws_s3_bucket.videos.arn}/*"]
  }

  statement {
    sid    = "ListVideoBucket"
    effect = "Allow"
    actions = [
      "s3:ListBucket",
      "s3:ListBucketMultipartUploads"
    ]
    resources = [aws_s3_bucket.videos.arn]
  }
}

resource "aws_iam_user_policy" "render_uploader" {
  name   = "s3-video-upload"
  user   = aws_iam_user.render_uploader.name
  policy = data.aws_iam_policy_document.render_uploader.json
}
