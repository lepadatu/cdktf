import { Construct } from 'constructs'
import { App, S3Backend, TerraformStack, TerraformHclModule, TerraformOutput } from 'cdktf'
import { AwsProvider } from './.gen/providers/aws'
import * as dev_config from './conf/dev.json';

export interface VPCConfig {
  readonly aws_provider: {
    region: string,
    profile: string
  };
  readonly s3_backend: {
    bucket: string,
    key: string,
    profile: string,
    region: string,
    dynamodbTable: string
  };
  readonly vpc: {
    name: string,
    cidr: string,
    azs: string[],
    private_subnets: string[],
    public_subnets: string[],
    enable_nat_gateway: boolean,
    enable_vpn_gateway: boolean,
    enable_dns_hostnames: boolean,
    enable_dns_support: boolean,
    tags: {
      Terraform: string,
      Environment: string
    }
  };
}
class VPCStack extends TerraformStack {
  constructor(scope: Construct, id: string, config: VPCConfig) {
    super(scope, id)
    new AwsProvider(this, 'aws', config.aws_provider)
    new S3Backend(this, config.s3_backend);
    const vpc = new TerraformHclModule(this, 'vpc', {
      source: "terraform-aws-modules/vpc/aws",
      variables: config.vpc
    })
    new TerraformOutput(this, 'vpc_arn', {
      value: vpc.get("vpc_arn"),
    })
    
  }
}

const app = new App()
new VPCStack(app, 'typescript-aws', dev_config)
app.synth()
