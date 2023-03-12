This is a simple typescript example for how to use cdktf with a terraform vpc module (i.e. https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/2.21.0)

The statefile is saved in s3 and dynamodb is used as locking mechanism.

The configuration for an entire environment (dev in this case) is stored in json format under conf directory.

The VPCStack class outputs the created VPC arn.

Please use these instructions to install cdktf: https://learn.hashicorp.com/tutorials/terraform/cdktf-install?in=terraform/cdktf

Then overwrite the created files with the ones from this repo. Make sure you diff them first.

Please modify conf/dev.json with yout own values (s3 bucket, dynamo-db table, profile, etc).
