data "aws_vpc" "existing" {
  filter {
    name   = "tag:Name"
    values = ["erp-vpc"]
  }
}

data "aws_subnets" "private" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.existing.id]
  }
}