# Placeholder stack. Do not create new EC2 here until you import what
# already exists in AWS.
#
# When you have instance IDs (and the app repo):
#   1. Write matching aws_instance / aws_security_group resources below
#   2. terraform import aws_instance.app i-xxxxxxxxxxxxxxxxx
#   3. terraform plan until it shows no changes
#
# Applying an empty stack is a no-op.

data "aws_caller_identity" "current" {}
