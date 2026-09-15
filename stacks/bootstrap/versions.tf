terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # This stack keeps local state on purpose. The S3 backend cannot store
  # its own bucket's state until the bucket exists.
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = {
      Project   = "shared"
      ManagedBy = "terraform"
    }
  }
}
