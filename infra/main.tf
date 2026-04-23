provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source = "./modules/vpc"
  name = "erp-vpc"
}

module "security" {
  source = "./modules/security"
  vpc_id = module.vpc.vpc_id
}

data "aws_db_instance" "existing" {
  db_instance_identifier = "erp-db"
}

data "aws_security_group" "rds" {
  id = data.aws_db_instance.existing.vpc_security_groups[0]
}

data "aws_subnet" "selected" {
  for_each = toset(module.vpc.private_subnet_ids)
  id       = each.value
}

output "subnet_azs" {
  value = {
    for k, v in data.aws_subnet.selected :
    k => v.availability_zone
  }
}

locals {
  valid_subnets = [
    for s in data.aws_subnet.selected :
    s.id if s.availability_zone != "us-east-1e"
  ]
}

resource "aws_vpc_endpoint" "lambda" {
  vpc_id            = module.vpc.vpc_id
  service_name      = "com.amazonaws.us-east-1.lambda"
  vpc_endpoint_type = "Interface"

  subnet_ids = local.valid_subnets

  security_group_ids = [
    module.security.vpc_endpoint_sg_id
  ]

  private_dns_enabled = true
}

module "lambda" {
  source                = "./modules/lambda"
  name                  = "erp-security-service"
  handler               = "handler.handler"
  filename              = "../dist.zip"
  subnet_ids            = module.vpc.private_subnet_ids
  security_group_ids = [
    module.security.lambda_sg_id
  ]
  environment_variables = {
    DB_HOST = data.aws_db_instance.existing.address
    DB_USER = var.db_user
    DB_PASS = var.db_password
    DB_NAME = var.db_name
    AUTH_LAMBDA_NAME = var.AUTH_LAMBDA_NAME
  }
  vpc_id = module.vpc.vpc_id
  role_arn = module.iam.lambda_role_arn
  runtime = "nodejs20.x"
  lambda_source_dir = "${path.root}/../Security/dist"
}

module "api" {
  source             = "./modules/apigateway"
  name               = "erp-security-api"
  lambda_invoke_arn  = module.lambda.invoke_arn
  lambda_name       = module.lambda.function_name
}

module "iam" {
  source = "./modules/iam"
  project_name = "security"
}