# Auth uses the standard AWS credential chain (no keys in this repo):
#   1. Environment: AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY
#   2. Shared config: aws configure  (~/.aws/credentials)
#   3. Optional named profile via var.aws_profile or AWS_PROFILE
provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}
