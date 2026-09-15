terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # After stacks/bootstrap is applied, uncomment and fill in the bucket/table names:
  # backend "s3" {
  #   bucket         = "willis-tfstate"
  #   key            = "revenue-ripple/prod/terraform.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "willis-tf-locks"
  #   encrypt        = true
  # }
}
